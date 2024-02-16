import express from "express";
import { CommandSucceededEvent } from "mongodb";

// start express to handle server
const app = express();

import mongoose from "mongoose";
import bodyParser from "body-parser";
const router = express.Router();


//middleware to allow front-end to send request to server

const enableCORS = function (req, res, next) {
    if (!process.env.DISABLE_XORIGIN) {
      const allowedOrigins = ["front-end-deployment-site"];
      const origin = req.headers.origin;
      if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
        console.log(req.method);
        res.set({
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        });
      }
    }
    next();
};
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/is-mongoose-ok/", function (req, res) {
    // path to check mongoose connection
    if (mongoose) {
      res.json({ isMongooseOk: !!mongoose.connection.readyState });
    } else {
      res.json({ isMongooseOk: false });
    }
});

import {Songs} from "./mongoose_db.js";
router.use(function (req, res, next) {
    // check Songs Model
    if (req.method !== "OPTIONS" && Songs.modelName !== "Songs") {
      return next({ message: "Songs Model is not correct" });
    }
    next();
});

import {getAllSongs} from "./mongoose_db.js";
import {getAllSongStats} from "./stats.js";
router.get("/Track/", function (req, res, next) {
    // path to list all tracks in Songs 
    getAllSongs(function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log("/api/Track/ - (GET) : Missing `done()` argument");
          return next({ message: "No tracks found in database" });
        }
        const stats = getAllSongStats(data);
        res.json({data: data, stats: stats});
      });
});

import {findSongById} from "./mongoose_db.js";
router.get("/Track/id/:id/", function (req, res, next) {
    // path to find track in db by track id
    const id = req.params.id;
    findSongById(id, function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log(`/api/Track/id/${id}/ - (GET) : Missing 'done()' argument`);
          return next({ message: "No track with that id in database" });
        }
        const stats = {"totalSongs":1,"totalArtists":1,"totalAlbums":1,"totalGenres":1};
        res.json({data: data, stats: stats});
      });
});

import {cleanStrInput, findSongsByField} from "./mongoose_db.js";
router.get("/Track/Title/:title/", function (req, res, next) {
    // path to find track in db by track title
    const title = req.params.title;
    const cleanedTitle = cleanStrInput(title);
    findSongsByField({Title: cleanedTitle}, function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log(`/api/Track/Title/${title}/ - (GET) : Missing 'done()' argument`);
          return next({ message: "No track with that title in database" });
        }
        const stats = getAllSongStats(data);
        res.json({data: data, stats: stats});
    });
});

router.get("/Artist/:firstName/:lastName/", function (req, res, next) {
    // path to list songs of a given artist
    const {firstName, lastName} = req.params;
    const cleanedArtist = {FirstName: cleanStrInput(firstName), LastName: cleanStrInput(lastName)};
    findSongsByField({Artist: cleanedArtist}, function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log(`/api/Artist/${artist}/ - (GET) : Missing 'done()' argument`);
          return next({ message: "No artist with that name in database" });
        }
        const stats = getAllSongStats(data);
        res.json({data: data, stats: stats});
      });
});

router.get("/Artist/:firstName/:lastName/:album", function (req, res, next) {
    // path to list songs of a given artist and a given album
    const {firstName, lastName, album} = req.params;
    const cleanedArtist = {FirstName: cleanStrInput(firstName), LastName: cleanStrInput(lastName)};
    const cleanedAlbum = cleanStrInput(album);
    findSongsByField({Artist: cleanedArtist, Album: album}, function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log(`/api/Artist/${artist}/ - (GET) : Missing 'done()' argument`);
          return next({ message: "No artist with that name in database" });
        }
        const stats = getAllSongStats(data);
        res.json({data: data, stats: stats});
      });
});

router.get("/Genre/:genre/", function (req, res, next) {
    // path to list songs in a given genre
    const genre = req.params.genre;
    const cleanedGenre = cleanStrInput(genre);
    findSongsByField({Genre: cleanedGenre}, function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log(`/api/Artist/${artist}/ - (GET) : Missing 'done()' argument`);
          return next({ message: "No tracks in that genre in database" });
        }
        const stats = getAllSongStats(data);
        res.json({data: data, stats: stats});      
    });
});

import {addOneSong} from "./mongoose_db.js";
router.post("/Track/", function (req, res, next) {
    // path to add track to db

    // check if req.body is provided
    if (!req.body){
        return next({message: "Please provide a request body" });
    }
    // check if json data song is included in req.body
    if (!Object.keys(req.body).includes("song")){
        return next({message: "Please provide a json data with key 'song'" });
    }
    const {song} = req.body;
    addOneSong(song, function (err, data) {
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log("/api/Track - (POST) : Missing `done()` argument");
          return next({ message: "Unable to update database" });
        }
        res
            .status(200)
            .type("txt")
            .send(CommandSucceededEvent.message || "Track successfully added.");       
    });
});

import {findSongAndUpdate} from "./mongoose_db.js";
router.put("/Track/id/:id/", function (req, res, next) {
    // path to update track with track id
    let id = req.params.id;
    // check if req.body is provided
    if (!req.body){
        return next({error: "Please provide a json data in request body" });
    }
    // check if json data song is included in req.body
    if (!Object.keys(req.body).includes("updateFields")){
        return next({error: "Please provide a json data with key 'updateFields'" });
    }
    const {updateFields} = req.body;
    try {
        findSongAndUpdate(id, updateFields, function (err, data) {
            if (err) {
                return next(err);
            }
            if (!data) {
                console.log(`/api/Track/id/${id} - (PUT) : Missing 'done()' argument`);
                return next({ message: "Unable to find track with id" });
            }
            res
            .status(200)
            .type("txt")
            .send(CommandSucceededEvent.message || "Track successfully updated.");   
        });
    } catch (e){
        console.log(e);
        return next(e);
    }  
});

import {removeSongById} from "./mongoose_db.js";
router.delete("/Track/id/:id/", function (req, res, next) {
    // path to delete track with track id
    let id = req.params.id;
    try {
        removeSongById(id, function (err, data) {
            if (err) {
                return next(err);
            }
            if (!data) {
                console.log(`/api/Track/id/${id} - (DELETE) : Missing 'done()' argument`);
                return next({ message: "Unable to find track with id" });
            }
            res
                .status(200)
                .type("txt")
                .send(CommandSucceededEvent.message || "Track successfully deleted.");        
            });
    } catch(e){
        console.log(e);
        return next(e);
    }
  })

app.use("/api", enableCORS, router);

// Middelware for database interaction error
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

// Catch-all middleware for unmatched routes
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res.status(404).type("txt").send("Not Found");
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Code_Challenge_Songs server is running on http://localhost:" + listener.address().port);
});