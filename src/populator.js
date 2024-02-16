import mongoose from "mongoose";

const sampleSongs= [
    {
      Title: 'The First Song',
      Artist: {    
        FirstName: 'The First',
        LastName: 'Artist'
      },
      Album: 'The First Album',
      Genre: 'Pop'
    },
    {
      Title: 'The Second Song',
      Artist: {
        FirstName: 'The First',
        LastName: 'Artist'
      },
      Album: 'The First Album',
      Genre: 'Jazz'
    },
    {
      Title: 'The First Song',
      Artist: {
        FirstName: 'The Second',
        LastName: 'Artist'
      },
      Album: 'The First Album',
      Genre: 'Pop'
    },
    {
      Title: 'The First Song',
      Artist: {
        FirstName: 'The Second',
        LastName: 'Artist'
      },
      Album: 'The Second Album',
      Genre: 'Jazz'
    }
  ];


import {Songs} from './mongoose_db.js';
// Function to populate the Song model
async function populateSongs(arrayOfSongs) {
  try {
    // Use create method to insert data into the MongoDB collection
    const result = await Songs.create(arrayOfSongs);
    console.log('Songs inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting songs:', error);
  } finally {
    // Close the connection after insertion
    mongoose.connection.close();
  }
}

// Call the populateSongs function to start the population process
populateSongs(sampleSongs);


