import React , {useState , useRef} from "react";
//import styles
import "./styles/app.scss";

//import components
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data"
import Library from "./components/Library";
import Nav from "./components/Nav";



function App() {

  const[songs,setSongs] = useState(data());
  const[currentSongs,setCurrentSongs] = useState(songs[0]);
  const[isPlaying,setIsPlaying] = useState(false);
  const [songInfo , setSongInfo] = useState({
    currentTime : 0,
    duration : 0
});
  const[libraryStatus,setLibraryStatus] = useState(false);

const timeUpdateHandler = (e)=>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({
      ...songInfo,
      currentTime : current,duration
  });
}


  const audioRef = useRef(null);

  const songEndHandler = async ()=>{
    let currentIndex = songs.findIndex((song) => song.id === currentSongs.id);
    await setCurrentSongs(songs[(currentIndex + 1)%songs.length]);
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSongs={currentSongs} />
      <Player setCurrentSongs = {setCurrentSongs} songs ={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSongs={currentSongs} />
      <Library setSongs={setSongs}  libraryStatus={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs = {songs} setCurrentSongs = {setCurrentSongs} />
      <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSongs.audio}></audio>
    </div>
  );
}

export default App;
