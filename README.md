# SongsServer API Documentation
## Base URL

```

https://songserver.onrender.com/api

```
## Authentication
Authentication is not required.

## Endpoints
### 1. Songs list

**URL**: '/api/Track/'<br>
**Method**: GET<br>
**Description**: This endpoint returns a 'data' object containing a list of songs, and 'stats' object containing overall count of songs, artists, albums and genre.<br>
**Parameters**: None<br>
**Example Request**:<br>

```

curl -X GET https://songserver.onrender.com/api/Track

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
{
    "data":
        [
            {
                "_id":"65ce42d81c21bc2f1da3b6cf",
                "Title":"The First Song",
                "Artist":
                {
                    "FirstName":"The Second",
                    "LastName":"Artist"
                },
                "Album":"The First Album",
                "Genre":"Pop"
            },
            {
                "_id":"65ce42d81c21bc2f1da3b6d0",
                "Title":"The First Song",
                "Artist":
                {
                    "FirstName":"The Second",
                    "LastName":"Artist"
                },
                "Album":"The Second Album",
                "Genre":"Jazz"
            }
        ],
    "stats":
        {
            "totalSongs":2,
            "totalArtists":1,
            "totalAlbums":2,
            "totalGenres":2
        }
}
  
```

### 2. Song(s) filtered by track title

**URL**: '/api/Track/Title/{title}/'<br>
**Method**: GET<br>
**Description**: This endpoint returns a 'data' object containing a list of filtered songs, and 'stats' object containing count of songs, artists, albums and genre in filtered songs.<br>
**Parameters**: <br>
- title:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Title of track<br>
**Example Request**:<br>
The example code below returns the songs returned for title 'The Second'.

```

curl -X GET https://songserver.onrender.com/api/Track/Title/The%20second%20song

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
 {
    "data":
        [
            {
                "_id":"65ce42d81c21bc2f1da3b6ce",
                "Title":"The Second Song",
                "Artist":
                    {
                        "FirstName":"The Second",
                        "LastName":"Artist"
                    },
                "Album":"The First Album",
                "Genre":"Jazz"
            }
        ],
    "stats":
        {
            "totalSongs":1,
            "totalArtists":1,
            "totalAlbums":1,
            "totalGenres":1
        }
}

```

**Resource Not Found**: <br>
If song is not found in the  database, "data" object is an empty list
- HTTP Status Code: 200 OK
- Response:
```
{
    "data":[],
    "stats":
    {
        "totalSongs":0,
        "totalArtists":0,
        "totalAlbums":0,
        "totalGenres":0
    }
}

```

### 3. Song(s) filtered by track id

**URL**: '/api/Track/id/{id}/'<br>
**Method**: GET<br>
**Description**: This endpoint returns one object containing a song (if any), and another object containing count of songs, artists, albums and genre in filtered songs.<br>
**Parameters**: <br>
- id:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: id is 24 characters long.<br>

**Example Request**:<br>
The example code below returns the songs returned for id '65ce42d81c21bc2f1da3b6ce'.<br>

```

curl -X GET https://songserver.onrender.com/api/Track/id/65ce42d81c21bc2f1da3b6ce

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
 {
    "data":
        [
            {
                "_id":"65ce42d81c21bc2f1da3b6ce",
                "Title":"The First Song",
                "Artist":
                    {
                        "FirstName":"The Second",
                        "LastName":"Artist"
                    },
                "Album":"The First Album",
                "Genre":"Pop"
            }
        ],
    "stats":
        {
            "totalSongs":1,
            "totalArtists":1,
            "totalAlbums":1,
            "totalGenres":1
        }
}

```

**Resource Not Found**: <br>
If song is not found in the  database, "data" object is an empty list. Same as in step 2.

**Error Handling**: <br>
- If id is not 24 characters long.
     **HTTP Status Code**: 400
     **Message**: Malformed parameter: the parameter id should be 24 characters long

### 4. Song(s) filtered by artist

**URL**: '/api/Artist/{fistName}/{lastName}/'<br>
**Method**: GET<br>
**Description**: This endpoint returns list of songs filtered by artist. It returns a 'data' object containing a list of songs, and 'stats' object containing count of songs, artists, albums and genre in filtered list.<br>
**Parameters**: <br>
- fistName:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Artist's first name<br>
- fistNalastNameme:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Artist's last name<br>
**Example Request**:<br>
  The example code below returns the songs returned for artist first name:'The First', last name:'Artist'.
```

curl -X GET https://songserver.onrender.com/api/Artist/The%20First/Artist

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
{
    "data":
    [{
        "_id":"65ce42d81c21bc2f1da3b6cd",
        "Title":"The First Song",
        "Artist":
        {
            "FirstName":"The First",
            "LastName":"Artist"
        },
        "Album":"The First Album",
        "Genre":"Pop"
    },
    {
        "_id":"65ce42d81c21bc2f1da3b6ce",
        "Title":"The Second Song",
        "Artist":
        {
            "FirstName":"The First",
            "LastName":"Artist"
        },
        "Album":"The First Album",
        "Genre":"Jazz"
    }],
    "stats":
    {"totalSongs":2,"totalArtists":1,"totalAlbums":1,"totalGenres":2}
}
```
**Resource Not Found**: <br>
If Aritst is not found in the  database, "data" object is an empty list. Same as in step 2.

### 5. Song(s) filtered by album

**URL**: '/api/Artist/{fistName}/{lastName}/{album}/'<br>
**Method**: GET<br>
**Description**: This endpoint returns list of songs filtered by artist and album. It returns a 'data' object containing a list of songs, and 'stats' object containing count of songs, artists, albums and genre in filtered list.<br>
**Parameters**: <br>
- fistName:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Artist's first name<br>
- lastName:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Artist's last name<br>
- album:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Album's title<br>
**Example Request**:<br>
  The example code below returns the songs returned for artist first name:'The First', last name:'Artist' and album: The First Album.
```

curl -X GET https://songserver.onrender.com/api/Artist/The%20First/Artist/The%20First%20Album

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
{
    "data":
    [{
        "_id":"65ce42d81c21bc2f1da3b6cd",
        "Title":"The First Song",
        "Artist":
        {
            "FirstName":"The First",
            "LastName":"Artist"
        },
        "Album":"The First Album",
        "Genre":"Pop"
    },
    {
        "_id":"65ce42d81c21bc2f1da3b6ce",
        "Title":"The Second Song",
        "Artist":
        {
            "FirstName":"The First",
            "LastName":"Artist"
        },
        "Album":"The First Album",
        "Genre":"Jazz"
    }],
    "stats":
    {"totalSongs":2,"totalArtists":1,"totalAlbums":1,"totalGenres":2}
}
```
**Resource Not Found**: <br>
If Aritst or Album is not found in the  database, "data" object is an empty list. Same as in step 2.

### 6. Song(s) filtered by genre

**URL**: '/api/Genre/{genre}/'<br>
**Method**: GET<br>
**Description**: This endpoint returns list of songs filtered by genre. It returns a 'data' object containing a list of songs, and 'stats' object containing count of songs, artists, albums and genre in filtered list.<br>
**Parameters**: <br>
- genre:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Genre's title<br>
**Example Request**:<br>
  The example code below returns the songs returned for genre: Pop.
```

curl -X GET https://songserver.onrender.com/api/Genre/Pop

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
{
    "data":
    [{
        "_id":"65ce42d81c21bc2f1da3b6cf",
        "Title":"The First Song",
        "Artist":
        {
            "FirstName":"The Second",
            "LastName":"Artist"
        },
        "Album":"The First Album",
        "Genre":"Pop"
    },
    {
        "_id":"65ce42d81c21bc2f1da3b6cd",
        "Title":"The First Song",
        "Artist":
        {
            "FirstName":"The First",
            "LastName":"Artist"
        },
        "Album":"The First Album",
        "Genre":"Pop"
    }],
    "stats":
    {"totalSongs":2,"totalArtists":2,"totalAlbums":1,"totalGenres":1}
}
```

**Resource Not Found**: <br>
If Genre is not found in the  database, "data" object is an empty list. Same as in step 2.

### 7. Add a song

**URL**: '/api/Track/'<br>
**Method**: POST<br>
**Description**: This endpoint allows user to add a song. It returns either a success or an error message.<br>
**Body**: <br>
  Example of song input

```
{"song":
    {
        "Title": "My New Song",
        "Artist": 
        {
            "FirstName": "The New", 
            "LastName": "Artist"
        },
        "Album": "My New Album",
        "Genre": "Ethiopic"
    }
}
```
**Example Request**:<br>
  The example code below returns the songs returned for genre: Pop.

```
curl -X POST \
  https://songserver.onrender.com/api/Track \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"song":{
    "Title": "My New Song",
    "Artist": {"FirstName": "The New", "LastName": "Artist"},
    "Album": "My New Album",
    "Genre": "Ethiopic"
    }}'

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
{
    "message": 
    "Track successfully added."
}
```
**Error Handling**: <br>
- If body is not provided by user:
     **HTTP Status Code**: 400
     **Message**: Missing request body: Song fields are incomplete
- If body is provided by user without song object:
     **HTTP Status Code**: 400
     **Message**: Malformed request body: Please provide a json data with key 'song'
- If song attributes are missing in song attributes:
     **HTTP Status Code**: 400
     **Message**: Malformed request body: Song fields are incomplete
- If artist attributes are missing in song object:
     **HTTP Status Code**: 400
     **Message**: Malformed request body: Please provide a first and last name for artist

### 7. Update a song

**URL**: '/api/Track/id/{id}'<br>
**Method**: POST<br>
**Parameters**: <br>
- id:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Track's id<br>
**Description**: This endpoint allows user to update a song. It returns either a success or an error message.<br>
**Body**: <br>
  Example of input to update song attributes
```
{"updateFields":
    {
        "Title": "Another New Song",
        "Genre": "Jazz"
    }
}
```
**Example Request**:<br>
  The example code below returns the songs returned for genre: Pop.

```
curl -X PUT \
  https://songserver.onrender.com/api/Track/id/65cfc20c5c4f10a2f2e1cfe3/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"song":{
    "Title": "Another New Song",
    "Genre": "Jazz"
    }}'

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
{
    "message": 
    "Track successfully updated."
}
```
**Error Handling**: <br>
- If id is not 24 characters long.
     **HTTP Status Code**: 400
     **Message**: Malformed parameter: the parameter id should be 24 characters long
- If body is not provided by user:
     **HTTP Status Code**: 400
     **Message**: Missing request body: Song fields are incomplete
- If body is provided by user without updateFields object:
     **HTTP Status Code**: 400
     **Message**: Malformed request body: Please provide a json data with key 'updateFields'
- If updateFields object doesn't contain any valid field:
     **HTTP Status Code**: 400
     **Message**: Malformed request body: Please provide valid song fields to update
- If artist attributes are missing in song object:
     **HTTP Status Code**: 400
     **Message**: Malformed request body: Please provide a first and last name for artist


### 8. Remove a song

**URL**: '/api/Track/id/{id}/'<br>
**Method**: DELETE<br>
**Description**: This endpoint allows user to delete a song from databse. It returns a success or an error message.<br>
**Parameters**: <br>
- id:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: id is 24 characters long.<br>

**Example Request**:<br>
The example code below returns the songs returned for id '65cfc20c5c4f10a2f2e1cfe3'.<br>

```

curl -X DELETE https://songserver.onrender.com/api/Track/id/65cfc20c5c4f10a2f2e1cfe3

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
 {
    "data":
        [
            {
                "_id":"65ce42d81c21bc2f1da3b6ce",
                "Title":"The First Song",
                "Artist":
                    {
                        "FirstName":"The Second",
                        "LastName":"Artist"
                    },
                "Album":"The First Album",
                "Genre":"Pop"
            }
        ],
    "stats":
        {
            "totalSongs":1,
            "totalArtists":1,
            "totalAlbums":1,
            "totalGenres":1
        }
}

```

**Resource Not Found**: <br>
If song is not found in the  database, "data" object is an empty list. Same as in step 2.

**Error Handling**: <br>
- If id is not 24 characters long.
     **HTTP Status Code**: 400
     **Message**: Malformed parameter: the parameter id should be 24 characters long


**General Error Responses**:
- **400 Bad Request**: The request is malformed or missing required parameters.
- **500 Internal Server Error**: An unexpected error occurred on the server.
- **404 Resource Not Found**: The resource you requested is not found.
