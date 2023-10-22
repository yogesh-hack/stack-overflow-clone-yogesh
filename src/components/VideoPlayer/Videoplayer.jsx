import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import ReactPlayer from 'react-player';
import "./videoplayer.css"

const Videoplayer = ({ videos }) => {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

    const bind = useGesture({
        onDoubleClick: ({ event }) => {
            if (event.clientX < window.innerWidth / 3) {
                // Double tap on left: Move 5 seconds backward
                playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
            } else if (event.clientX > (2 * window.innerWidth) / 3) {
                // Double tap on right: Move 10 seconds forward
                playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
            } else {
                // Double tap in the middle: Play/Pause
                setPlaying(!playing);
            }
        },
        onPointerDown: ({ event }) => {
            if (event.clientX < window.innerWidth / 3) {
                // Press and hold on the left side: Go back at 1x speed
                setSpeed(0.5);
            } else if (event.clientX > (2 * window.innerWidth) / 3) {
                // Press and hold on the right: Go forward at 2x speed
                setSpeed(2);
            }
        },
        onPointerUp: () => {
            setSpeed(1);
        },
    });

    const handleVideoClick = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setPlaying(true);
    };

    return (
        <div className='video-container'>
            <div {...bind()} style={{ touchAction: 'none' }}>
                <h2 style={{ paddingTop: '40px' }}>Watch video</h2>
                <animated.div
                    style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        transform: xy.to((x) => `translateX(${x}px)`),
                    }}
                />
                <ReactPlayer
                    ref={playerRef}
                    url={selectedVideo}
                    playing={playing}
                    controls
                    width="100%"
                    height="100%"
                    playbackRate={speed}
                    onEnded={() => setPlaying(false)}
                />
            </div>
            <div className='video-list'>
                <h2>Video List</h2>
                <div class="card-category-3">
                    <ul>
                    {videos.map((videoUrl, index) => (
                        <li key={index}>
                            <div class="ioverlay-card io-card-2">
                                <div class="card-content">
                                    <span class="card-title">Smaple Video {index + 1}</span>
                                    
                                </div>
                                <span class="card-link">
                                    <button onClick={() => handleVideoClick(videoUrl)}>▶️Play</button>
                                </span>
                                <img src="https://www.dropbox.com/s/lsxxizyph3ic7zb/frog-4296784_640.jpg?raw=1" />
                            </div>
                        </li>
                        ))}
                    </ul>

                </div>          
            </div>
        </div>
    )
}

export default Videoplayer