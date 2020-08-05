import React from 'react';

const SongNames = (props) =>{
  const {active, songs } = props;

        return (
            <div className="music">
                <h2 className="head" id="song-names-head">Songs <span role="img" aria-label="note">&#127926;</span></h2>
                <ul>
                {songs.map((element, index)=>{
                            return active===index ?
                            <li key={index} className="on">&nbsp;{element.name}</li>:
                            <li key={index}>&nbsp;{element.name}</li>
                            
                        })}
                </ul>
            </div>

                        
        )
    
}

export default SongNames;