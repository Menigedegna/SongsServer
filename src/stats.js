const getAllSongStats = (songArray) =>{
    let stats = {
        totalSongs: 0,
        totalArtists: new Set(),
        totalAlbums: new Set(),
        totalGenres: new Set()
    };

    songArray.forEach(song => {
        // Count total songs
        stats.totalSongs++;

        // Collect unique artists, albums, and genres
        stats.totalArtists.add(song.Artist.FirstName+song.Artist.LastName);
        stats.totalAlbums.add(song.Album);
        stats.totalGenres.add(song.Genre);
    });

    // Convert sets to arrays for count
    stats.totalArtists = Array.from(stats.totalArtists).length;
    stats.totalAlbums = Array.from(stats.totalAlbums).length;
    stats.totalGenres = Array.from(stats.totalGenres).length;

    return stats;
}

export { 
    getAllSongStats
}