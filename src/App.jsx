import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import CaptionInput from './components/CaptionInput';


function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState([]);

  return (
    <div className="App bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Video Captioning App</h1>
      <div className="max-w-4xl mx-auto">
        <VideoPlayer videoUrl={videoUrl} captions={captions} />
        <CaptionInput videoUrl={videoUrl} setVideoUrl={setVideoUrl} captions={captions} setCaptions={setCaptions} />
      </div>
    </div>
  );
}

export default App;
