import React from 'react';
import Navbar from './Navbar';
import MainMenu from './MainMenu';
import PlaySong from './PlaySong';
import SongMenu from './SongMenu';
import SongNames from './SongNames';

// Render wheel
const Display = (props) =>{
  const {active , menuItems , songItems , songs ,songIndex , currentMenu, pause , audio } = props;

        return (
            <div className="display">
                  <Navbar pause={pause} />
                  {currentMenu === -1 && <MainMenu menuItems={menuItems} active={active} songIndex={songIndex} songs={songs} />}
                  {(currentMenu === 0 || currentMenu === 7) && <PlaySong audio={audio} pause={pause} songIndex={songIndex} songs={songs} />}
                  {currentMenu === 1 && <SongMenu active={active} songItems={songItems} />}
                  {currentMenu === 2 && <div className="void"><h1>Games</h1></div>}
                  {currentMenu === 3 && <div className="void"><h1>Settings</h1></div>}
                  {currentMenu === 4 && <SongNames active={active} songs={songs} />}
                  {currentMenu === 5 && <div className="void"><h1>Artists</h1></div>}
                  {currentMenu === 6 && <div className="void"><h1>Albums</h1></div>}            
            </div>
        )
    
}

export default Display;