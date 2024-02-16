import 'dotenv/config';
import mongoose from "mongoose";

let Songs;

//connect to mongodb cluser 
mongoose.connect(process.env.MONGO_URI);


// Create a 'Song' schema 
let songSchema = new mongoose.Schema({
  Title: {type: String, required: true},
  Artist: {
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true}
  },
  Album: {type: String, required: true},
  Genre: {type: String, required: true}
})

// Create a 'Songs' model   
Songs = mongoose.model('Songs', songSchema);


const cleanStrInput = (stringInput) => {
  /**
   * @description Function cleans and formats string input
   * @param {string} stringInput string input
   * @returns {string} a string without excess space in it
   */
  // format string to lower case
  let stringInputArrLowerCase = stringInput.toLowerCase();
  // remove excess space
  let stringInputArr = stringInputArrLowerCase.split(" ");
  let noSpaceStringInput= stringInputArr.filter(chr => chr!="");
  // capitalize string
  let capitalizeString = noSpaceStringInput.map(chr=>chr[0].toUpperCase()+chr.slice(1));
  let result = capitalizeString.join(" ");
  return result;
}

const checkAllFieldsArePresent = (fieldsArray, targetObject) =>{
    /**
     * @description Function checks if all required fields are present and their values are not empty
     * @param {object} fieldsArray array of strings containing field labels
     * @param {object} targetObject dictionnary which is checked
     * @returns {boolean} true if all fields are present and filled
     */
    const checkFields = fieldsArray.map(field => targetObject[field]===undefined || targetObject[field]=='');
    const sumCheckFields = checkFields.reduce((sum, field) => sum + field, 0);
    return sumCheckFields == 0;
}

const getAllSongs = async(done) => {
  /**
   * @description Function finds all songs in Songs
   * @returns None
   */
  try {
    const songsFound = await Songs.find({}).lean().select({__v: 0});
    console.log(songsFound);
    done(null, songsFound);  
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const addOneSong = async(songObject, done) => {
  /**
   * @description Function adds one track to Songs
   * @param {object} songObject dictionary containing a song {title, artist, album, genre}
   * @returns None
   */

  // FORMAT INPUT
  // check if all fields are present and their values are not empty
  const fields = ['Title', 'Artist', 'Album', 'Genre'];
  const allFieldsAreValidated = checkAllFieldsArePresent(fields, songObject);
  if (!allFieldsAreValidated){
    const error = new Error('Malformed request body: Song fields are incomplete');
    error.status = 400;
    return done(error);
  }
  const artistField = ['FirstName', 'LastName'];
  const artistFieldsAreValidated = checkAllFieldsArePresent(artistField, songObject['Artist']);
  if (!artistFieldsAreValidated){
    const error = new Error('Malformed request body: Please provide a first and last name for artist');
    error.status = 400;
    return done(error);
  }
  // clean string input for each field
  let cleanedSong = {};
  fields.forEach(field => {
    if(field=="Artist"){
      cleanedSong[field]={
        FirstName: cleanStrInput(songObject[field]["FirstName"]),
        LastName: cleanStrInput(songObject[field]["LastName"]),
      }
    }else{
      cleanedSong[field]=cleanStrInput(songObject[field]);
    }
  });

  // CREATE SONG
  try {
    const songsCreated = await Songs.create(cleanedSong);
    console.log(songsCreated);
    done(null, songsCreated);  
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const is24CharHexString = (value) => typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);

const findSongById = async(songId, done) => {
  /**
   * @description Function finds a song by id
   * @param {string} songId song id
   * @returns None
   */
  if(is24CharHexString(songId)){
    songId = new mongoose.Types.ObjectId(songId);
    try {
      const songsFound = await Songs.findById({_id: songId}).lean().select({__v: 0});
      console.log(songsFound);
      done(null, songsFound);  
    } catch (err) {
      console.error(err);
      done(err);
    }
  }else{
    const error = new Error('Malformed parameter: the parameter id should be 24 characters long');
    error.status = 400;
    done(error);
  }

};

const findSongsByField = async(fieldValue, done) => {
  /**
   * @description Function finds songs by title
   * @param {object} fieldValue dictionnary with track's title, album's or artist's name, or genre label e.g{Title: title}
   * @returns None
   */
  try {
    const songsFound = await Songs.find(fieldValue).lean().select({__v: 0});
    console.log(songsFound);
    done(null, songsFound);  
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const findSongAndUpdate = async(songId, updateFields, done) => {
  /**
   * @description Function finds a song by id and updates all other fields according to updateFields argument
   * @param {string} songId song id
   * @param {object} updateFields dictionary containing title and/or artist and/or album and/or genre
   * @returns None
   */
  if(!is24CharHexString(songId)){
    const error = new Error('Malformed parameter: the parameter id should be 24 characters long');
    error.status = 400;
    return done(error);
  }
  songId = new mongoose.Types.ObjectId(songId);
  const fields = ['Title', 'Artist', 'Album', 'Genre'];
  let correctFields = {}
  Object.keys(updateFields).forEach(field =>{ 
      if(fields.includes(field)){
          return correctFields[field]=updateFields[field];
      }
  });
  if ( Object.keys(correctFields).length==0 ){
    const error = new Error('Malformed request body: Please provide valid song fields to update');
    error.status = 400;
    return done(error)
  }else{
    if ( Object.keys(correctFields).includes("Artist") 
    && ( !Object.keys(correctFields["Artist"]).includes("FirstName") || !Object.keys(correctFields["Artist"]).includes("LastName"))
    ){
      const error = new Error('Malformed request body: Please provide valid fields for Artist to update track');
      error.status = 400;
      return done(error)
    }
  }
  // clean string input for each field
  const cleanedInput = {}
  Object.keys(correctFields).forEach(field => {
    if (field=="Artist"){
      cleanedInput[field]={
        "FirstName": cleanStrInput(updateFields[field]["FirstName"]),
        "LastName": cleanStrInput(updateFields[field]["LastName"])
      }
    }else{
      cleanedInput[field]=cleanStrInput(updateFields[field])
    }
  });

  try {
    const songsFound = await Songs.findOneAndUpdate(
      {_id: songId}, 
      {$set: updateFields})
      .lean()
      .select({__v: 0});
    console.log(songsFound);
    done(null, songsFound);  
  } catch (err) {
    console.error(err);
    done(err);
  }
};

const removeSongById = async(songId, done) => {
  /**
   * @description Function deletes one song by song's id 
   * @param {string} songId song id
   * @returns None
   */
  if(!is24CharHexString(songId)){
    const error = new Error('Malformed parameter: the parameter id should be 24 characters long');
    error.status = 400;
    return done(error);
  }
  songId = new mongoose.Types.ObjectId(songId);
  try {
    const songsFound = await Songs.findOneAndDelete({_id: songId});
    console.log(songsFound);
    done(null, songsFound);  
  } catch (err) {
    console.error(err);
    done(err);
  }
};

export { 
  Songs, 
  cleanStrInput, 
  getAllSongs, 
  addOneSong, 
  findSongById, 
  findSongsByField, 
  findSongAndUpdate, 
  removeSongById
};

