import React from 'react';
import Wheel from './Wheel.js'
import Display from './Display.js'

const Holder = (props) => {
  const {active , menuItems , songItems , songs ,songIndex , currentMenu, pause , audio } = props;

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
            <Wheel />            
        </div>

    );

    

}

export default Holder;
