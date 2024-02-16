# SongsServer API Documentation
## Base URL

```

https://songserver.onrender.com/api

```
## Authentication
Authentication is not required.

## Endpoints
### 1. Songs list

**URL**: '/api/Track'<br>
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
If id is not 24 characters long.
- **HTTP Status Code**: 500 SERVER ERROR
- **Body**
```
  id is 24 characters long

```

### 4. Song(s) filtered by artist

**URL**: '/api/Artist/{fistName}/{lastName}'<br>
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

### 5. Song(s) filtered by album

**URL**: '/api/Artist/{fistName}/{lastName}/{album}'<br>
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

### 6. Song(s) filtered by genre

**URL**: '/api/Genre/{genre}'<br>
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
### 7. Add a song

**URL**: '/api/Track'<br>
**Method**: POST<br>
**Description**: This endpoint allows user to add a song. It returns either a success message or an error message.<br>
**Parameters**: <br>
- genre:<br>
  Type: **string**<br>
  Required: Yes<br>
  Description: Genre's title<br>
**Example Request**:<br>
  The example code below returns the songs returned for genre: Pop.

```
curl -X POST \
  https://songserver.onrender.com/api/Track \
  -H 'Authorization: Bearer {token}' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"song":{
    "Title": "My New Song Song",
    "Artist": {"FirstName": "The New", "LastName": "Artist"},
    "Album": "My New Album",
    "Genre": "Ethiopic"
    }}'

```
**Response**:<br>
- HTTP Status Code: 200 OK
- Response:
```
Track successfully added.
```

**Error Responses**:
- **400 Bad Request**: The request is malformed or missing required parameters.
- **500 Internal Server Error**: An unexpected error occurred on the server.
- **404 Resource Not Found**: The resource you requested is not found.
