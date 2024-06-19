import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import CaptionInput from './components/CaptionInput';


function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);

  return (
    <div className="app bg-gray-100 min-h-screen p-8">
      <div className='w-full flex justify-center'><span className="text-3xl font-bold text-center mb-8 shadow-md  p-4">Video Captioning App</span></div>
      <div className="max-w-4xl mx-auto">
        <VideoPlayer videoUrl={videoUrl} captions={captions} />
        <CaptionInput videoUrl={videoUrl} setVideoUrl={setVideoUrl} captions={captions} setCaptions={setCaptions} />
      </div>
    </div>
  );
}

export default App;
