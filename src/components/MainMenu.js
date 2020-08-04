import React from 'react';

import song from '../static/side-img/music.png';
import game from '../static/side-img/game.jpg';
import settings from '../static/side-img/settings.jpg';


const MainMenu = (props) => {
  const {active , menuItems , songs ,songIndex } = props;

    return(
       <div className="menu-container">
            <div className="menu">
                <h3 className="ipod">iPod.js</h3>
                <ul>
                    {menuItems.map((element, index)=>{
                        return active===index ? 
                        <li key={index} className="on">&nbsp;{element}</li> : 
                        <li key={index}>&nbsp;{element}</li>
                    })}
                </ul>
            </div>
            <div className="side">
                {active === 0 && <img className="side-img" src={songs[songIndex].img} alt=""></img>}
                {active === 1 && <img className="side-img" src={song} alt=""></img>}
                {active === 2 && <img className="side-img" src={game} alt=""></img>}
                {active === 3 && <img className="side-img" src={settings} alt=""></img>}
            </div>
        </div>

    );

    

}

export default MainMenu;
