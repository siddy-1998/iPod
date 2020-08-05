import React from 'react';
import Wheel from './Wheel.js'
import Display from './Display.js'

const Holder = (props) => {
  const { active , menuItems , songItems , songs ,songIndex , currentMenu, pause , 
          audio ,togglePlayPause , forwardSong , reverseSong , updatePointer ,
          navigateForward ,navigateBackward } = props;

    return(
        <div className="holder">
            <Display active={active} 
                    menuItems={menuItems} 
                    songItems={songItems} 
                    songs={songs} 
                    songIndex={songIndex} 
                    currentMenu={currentMenu} 
                    pause={pause} 
                    audio={audio}  
            />
            <Wheel  active={active}
                    currentMenu = {currentMenu}
                    togglePlayPause = {togglePlayPause}
                    forwardSong = {forwardSong}
                    reverseSong = {reverseSong}
                    updatePointer = {updatePointer}
                    navigateForward = {navigateForward}
                    navigateBackward = {navigateBackward}
            />            
        </div>

    );

    

}

export default Holder;
