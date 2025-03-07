import React from "react";


const Song = ({currentSongs}) =>{
    return(
        <div className="song-container">
            <img alt={currentSongs.name} src={currentSongs.cover}></img>
            <h2>{currentSongs.name}</h2>
            <h3>{currentSongs.artist}</h3>
        </div>
    )
}

export default Song;