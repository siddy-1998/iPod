import React from 'react';
import ZingTouch from 'zingtouch';


// Render wheel
class Wheel extends React.Component {
    constructor(){
        super();

        this.angle =0;
    }

     componentDidMount() {
         
        const { navigateBackward ,togglePlayPause, forwardSong , reverseSong } = this.props;
        
        const wheel = document.getElementById("wheel");
        const activeRegion = ZingTouch.Region(wheel);

        const menuBtn = document.getElementById("menu-btn");
        const playPauseBtn = document.getElementById("play-pause-btn");
        const reverseBtn = document.getElementById("reverse-btn");
        const forwardBtn = document.getElementById("forward-btn");
        
        const wheelController = this.wheelController;


        const longTap = new ZingTouch.Tap({
            maxDelay:10000,
            numInputs: 1,
            tolerance: 1,
        })
        
        //for tap gesture
        activeRegion.bind(menuBtn, 'tap', function (e) {
            navigateBackward();
        });       
        activeRegion.bind(playPauseBtn, 'tap', function (e) {
            togglePlayPause();
        });
        
        //for rotating gesture
        activeRegion.bind(wheel, 'rotate', function (e) {
             wheelController(e);
         });
        
        //for long taps 
        activeRegion.bind(forwardBtn, longTap, function (e) {
            forwardSong(e);
        });
        activeRegion.bind(reverseBtn, longTap, function (e) {
            reverseSong(e);
        });

        

    }

    wheelController = (e) => {
        const { updatePointer, currentMenu } = this.props;

        if (e.detail.distanceFromOrigin === 0) {
            this.angle = e.detail.angle;
        }
        
        
        if (Math.abs(this.angle - e.detail.angle) > 300) {
            this.angle = Math.abs(e.detail.angle);
            if (e.detail.distanceFromLast === 0) {
                return;
            }
            else if (e.detail.distanceFromLast < 0) {
                updatePointer(1, currentMenu);
            }
            else {
                updatePointer(0, currentMenu);
            }

        } 
        else if (Math.abs(this.angle - e.detail.angle) > 15) {
            this.angle = Math.abs(e.detail.angle);

            if (e.detail.distanceFromLast === 0) {
                return;
            }
            else if (e.detail.distanceFromLast > 0) {
                updatePointer(1, currentMenu);
            } 
            else {
                updatePointer(0, currentMenu);
            }

        }
    }




    render() {

        const { active , currentMenu , navigateForward } = this.props; 

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

                <div className="centre-btn" id="centre-btn" onClick={() => {navigateForward(active, currentMenu)}}></div>

               
            </div>
        )
    }
}

export default Wheel;