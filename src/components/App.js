import React from 'react';
import Holder from './Holder';

import song1 from '../static/songs/Attention.mp3';
import song2 from '../static/songs/Bruises.mp3';
import song3 from '../static/songs/Falling.mp3';

import song1Img from '../static/songs-cover-image/attentionCI.png';
import song2Img from '../static/songs-cover-image/bruisesCI.jpg';
import song3Img from "../static/songs-cover-image/fallingCI.jpg";


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      active: 0,
      menuItems: ["Now Playing", "Songs", "Games", "Settings"], 
      songItems: ["All Songs", "Artist", "Albums"],
      songs: [{name : "Attention", url : song1, img : song1Img},
               {name : "Bruises", url : song2, img : song2Img},
               {name : "Falling", url : song3, img : song3Img}
              ],
      songIndex: 0, 
      currentMenu : -1,
      pause : true,
      audio: new Audio(song1)
    }
  }


 render(){
   
  const {active , menuItems , songItems , songs ,songIndex , currentMenu, pause , audio } = this.state;

     return(
       <div className="App">
        <Holder active={active} 
                menuItems={menuItems} 
                songItems={songItems} 
                songs={songs} 
                songIndex={songIndex} 
                currentMenu={currentMenu} 
                pause={pause} 
                audio={audio} 
        />      
       </div>
  );
   
 }

}

export default App;
