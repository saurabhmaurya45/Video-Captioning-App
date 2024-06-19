import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useRef } from 'react';

function VideoPlayer({ videoUrl, captions }) {
    const [currentCaption, setCurrentCaption] = useState('');
    const playerRef = useRef(null);


    useEffect(() => {
        const interval = setInterval(() => {
            if (captions.length > 0) {
                const currentTime = playerRef.current.getCurrentTime();
                const caption = captions.find(caption => currentTime >= caption.time.start && currentTime <= caption.time.end);
                setCurrentCaption(caption ? caption.text : '');
            }
        }, 500);

        return () => clearInterval(interval);
    }, [captions,videoUrl]);

    return (
        <div className="video-player relative bg-black flex justify-center items-center mb-10">
            <ReactPlayer url={videoUrl} ref={playerRef} controls className="" />
            <div className="captions absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
                {currentCaption}
            </div>
        </div>
    );
}

export default VideoPlayer;
