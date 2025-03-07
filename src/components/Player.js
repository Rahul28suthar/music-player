import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay , faAngleLeft,faAngleRight,faPause} from "@fortawesome/free-solid-svg-icons";



const Player = ({setSongs, setCurrentSongs, songs , setSongInfo, songInfo, audioRef ,currentSongs , isPlaying , setIsPlaying}) =>{

   
    const activeLibraryHandler = (nextPrev)=>{
        const newSong = songs.map((song)=>{
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active : true,
                }
            }else{
                return{
                    ...song,
                    active: false
                }
            }
        });
        setSongs(newSong); 
    }
   

    const playSongHandler = ()=>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
            
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        
    }
   
    const drageHandler = (e)=>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime : e.target.value
        })
    }

    const skipTrackHandler = async (direction)=>{
        let currentIndex = songs.findIndex((song) => song.id === currentSongs.id);
        if(direction === 'skip-forward'){
           await setCurrentSongs(songs[(currentIndex + 1)%songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1)%songs.length]);
            if(isPlaying) audioRef.current.play(); 
        }
        if(direction === 'skip-back'){
            if((currentIndex -1 )%songs.length === -1){
                 await setCurrentSongs(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play(); 
                return;
            }
            await setCurrentSongs(songs[(currentIndex - 1)%songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1)%songs.length]);
        }
        if(isPlaying) audioRef.current.play();

    }
    //usestate
  

    return(
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
              
                <input 
                min={0}
                max={songInfo.duration || 0}
                value={songInfo.currentTime}
                onChange={drageHandler}
                type="range" />
                  
                <p>End Time</p>       
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=>skipTrackHandler("skip-back")} className="skip-back"size="2x" icon = {faAngleLeft}/>
                <FontAwesomeIcon  className="play" onClick={playSongHandler} size="2x" icon = {isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={()=>skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon = {faAngleRight}/>
            </div>
           
        </div>
    )
}

export default Player;