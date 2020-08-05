import React from 'react';

// Renders navbar
class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            time: this.getCurrentTime(),
        }

         this.stateId = "";
    }

     componentDidMount() {
        this.stateId = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 60000);
    }

    
    getCurrentTime() {
        const today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        if (today.getMinutes() < 10) {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        return time;
    }

    
    render() {
        const { time } = this.state;

        return (
            <div className="navbar">
                <div className="time">{time}</div>
                <div className="battery">
                    <i className="fa fa-battery-three-quarters" aria-hidden="true"></i>
                </div>
  

                
            </div>
        )
    }
}


export default Navbar;
