import React from 'react';

class PlaySong extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
        }
        this.intervalId = "";


    }

    componentDidMount() {
        const { audio } = this.props;
        this.setState({ currentTime: audio.currentTime });
        this.intervalId = setInterval(() => {
            this.setState({ currentTime: this.props.audio.currentTime });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { pause, songIndex, audio, songs } = this.props;

        var currentTimeRender = Math.floor(this.state.currentTime / 60) + ":" + Math.floor(this.state.currentTime % 60);
        
        var durationRender = Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
        
        const percentageComplete = { width: (this.state.currentTime / audio.duration * 100) + "%" };
        
        if(durationRender==="NaN:NaN"){
            durationRender="0:00";
        }
        
        if(Math.floor(this.state.currentTime % 60 < 10)){
            currentTimeRender = Math.floor(this.state.currentTime / 60) + ":0" + Math.floor(this.state.currentTime % 60);
        }
        
        return (
            <div className="now-playing-container">
                <div className="song-details">
                    <img src={songs[songIndex].img} alt="songImg"></img>
                    <div>
                        <div className="song-name">{songs[songIndex].name}</div>
                        {!pause && <div className="play-pause"><i className="fa fa-play-circle-o" aria-hidden="true"></i></div>}
                        {pause && <div className="play-pause"><i className="fa fa-pause-circle-o" aria-hidden="true"></i></div>}
                    </div>
                </div>
                <div className="status">
                    {currentTimeRender}
                    <div id="progress">
                        <div style={percentageComplete} id="progress-bar"></div>
                    </div>
                    {durationRender}
                </div>
            </div>
        )
    }
}


export default PlaySong;