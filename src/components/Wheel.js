import React from 'react';

// Render wheel
class Wheel extends React.Component {
    render() {
        return (
            <div className="wheel-container">
                <div className="wheel" id="wheel" >
                    <div className="controls" id="menu-btn">
                        <div>MENU</div>
                    </div>
                    <div className="controls" id="forward-btn">
                        <i className="fas fa-fast-forward"></i>
                    </div>
                    <div className="controls" id="play-pause-btn">
                        <div>
                            <i className="fas fa-play"></i>
                            <i className="fas fa-pause"></i>
                        </div>
                    </div>
                    <div className="controls" id="reverse-btn">
                        <i className="fas fa-fast-backward"></i>
                    </div>
                </div>

                <div className="centre-btn" id="centre-btn"></div>

               
            </div>
        )
    }
}

export default Wheel;