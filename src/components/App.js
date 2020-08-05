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
      songItems: ["All Songs", "Artist", "Albums","Playlists"],
      songs: [{name : "Attention", url : song1, img : song1Img},
               {name : "Bruises", url : song2, img : song2Img},
               {name : "Falling", url : song3, img : song3Img}
              ],
      songIndex: 0, 
      currentMenu : -1,
      pause : true,
      audio: new Audio(song1),
      navStack : [],  //->keeps track of visited pages therefore help in navigating 
      MAX_INDEX_OF_MENU : {"-1":3, 1:3 , 4:2},
      CURRENT_MENU_MAPPER : { "-1": [0,1,2,3] , "1" : [4,5,6,7]}
    }
  }

  //for toggling play pause btn
    togglePlayPause = () => {

      if (this.state.pause === true) {
        this.setState({
          pause: false
        });
        this.state.audio.play();
      } 
      else {
        this.setState({
          pause: true
        });
        this.state.audio.pause();
      }
    }

  //for forwarding to next song or forword current song depending on interval
    forwardSong = (e) => {
      if (this.state.pause === true) {
        return;
      }
      //interval less than 250ms
      if (e.detail.interval < 250) {
       
        //pause current song
        this.state.audio.pause();
       
        let songIndex = this.state.songIndex;
       
        if (songIndex === this.state.songs.length - 1) {
          songIndex = 0;
        } 
        else {
          songIndex++;
        }
       
        this.setState({
          songIndex: songIndex,
          audio: new Audio(this.state.songs[songIndex].url)
        }, () => {
          this.state.audio.play();
        });
      } 
      //interval greater than 250ms and less than 10s
      else if (e.detail.interval > 250 && e.detail.interval < 10000) {
        const interval = e.detail.interval / 100;
        this.setState((prevState) => {
          prevState.audio.currentTime += interval;
          return prevState;
        })
      }
    }

  //for moving to prev song or backword current song depending on interval
  reverseSong = (e) => {
    if (this.state.pause === true) {
      return;
    }
   
    if (e.detail.interval < 250) {
      //pause current song
      this.state.audio.pause();

     let songIndex = this.state.songIndex;
       
        if (songIndex === 0) {
          songIndex = this.state.songs.length - 1;
        } 
        else {
          songIndex--;
        }
     
      this.setState({
          songIndex: songIndex,
          audio: new Audio(this.state.songs[songIndex].url)
        }, () => {
          this.state.audio.play();
        });
    }
     else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
  }

  //for updating the pointer when we rotate on wheel
  updatePointer = (direction, menu) => {
   // if current menu is not scrollable then return
    if (menu!==-1 && menu!==1 && menu!==4) {
      return;
    }

    let minIndexOfMenu = 0;
    let maxIndexOfMenu = this.state.MAX_INDEX_OF_MENU[menu];

    
    if (direction === 1) {
      //travelling clockwise
      if (this.state.active >= maxIndexOfMenu) {
        //pointer on last index then set it to first index
        this.setState({ active: minIndexOfMenu })
      } 
      else {
        this.setState({ active: this.state.active + 1 })
      }
    }
     else {
       //travelling anti-clock
      if (this.state.active <= minIndexOfMenu) {
        //pointer on first index then set it to last index
        this.setState({ active: maxIndexOfMenu })
      } 
      else {
        this.setState({ active: this.state.active - 1 })
      }
    }
  }

  //for changing song from song name list
  changeSong = (id, navStack) => {
    this.state.audio.pause();
    this.setState({ currentMenu: 8, navStack: navStack, active: 0, pause: false, songIndex: id, audio: new Audio(this.state.songs[id].url) }
    , () => {
      this.state.audio.play();
    });
    return;
  }

  //for going forword
  navigateForward = (id, lastMenu) => {

    console.log(id,lastMenu);

    const navStack = [...this.state.navStack];
     
    if (lastMenu!==-1 && lastMenu!==1 && lastMenu!==4 && lastMenu!==0 && lastMenu!==8) {
      return;
    }
     
    //u r at main menu , just push ur position and set currentmenu to the id ot pointer u r at
    if (lastMenu === -1) {
      navStack.push(this.state.currentMenu);
      this.setState({ currentMenu: id, navStack: navStack, active: 0 });
      return;
    }

    // ur at playing screen , just pause and play toogle
    if (lastMenu===8 || lastMenu===0) {
      this.togglePlayPause();
      return;
    }

    //for any other case first push location in stack
    navStack.push(this.state.currentMenu);
    
    //u r at song name list . clicking on that song plays it
    if (lastMenu === 4) {
      this.changeSong(id,navStack);
      return;
    }

    const currentMenu = this.state.CURRENT_MENU_MAPPER[lastMenu][id];
    this.setState({ currentMenu: currentMenu, navStack: navStack, active: 0 });

  }

  //for going backword
  navigateBackward = () => {
    const navStack = [...this.state.navStack];

    if(navStack.length===0)
      return;

    const prevMenu = navStack.pop();
    this.setState({ currentMenu: prevMenu, navStack: navStack, active:0 });

    return;
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
                togglePlayPause = {this.togglePlayPause}
                forwardSong = {this.forwardSong}
                reverseSong = {this.reverseSong}
                updatePointer = {this.updatePointer}
                navigateForward = {this.navigateForward}
                navigateBackward = {this.navigateBackward}
        />      
       </div>
  );
   
 }

}

export default App;
