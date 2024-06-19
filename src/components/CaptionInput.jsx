import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { convertTimeToSeconds, showError, validateInputs } from '../utils';
import CaptionTable from './CaptionTable';

function CaptionInput({ videoUrl, setVideoUrl, captions, setCaptions }) {
  const [captionText, setCaptionText] = useState('');
  const [timestampStart, setTimestampStart] = useState('');
  const [timestampEnd, setTimestampEnd] = useState('');


  const addCaption = () => {
    const error = validateInputs(captionText,timestampStart,timestampEnd)
    if(Object.keys(error).length){
      Object.keys(error).map((key)=>showError(error[key]))
      return 
    }
    if (captionText && timestampStart && timestampEnd) {
      setCaptions([...captions, { text: captionText, time: { start: convertTimeToSeconds(timestampStart), end: convertTimeToSeconds(timestampEnd) } }]);
      setCaptionText('');
      setTimestampStart('');
      setTimestampEnd('');
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Caption Text"
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Start Time (HH:MM:SS or MM:SS)"
          value={timestampStart}
          onChange={(e) => setTimestampStart(e.target.value)}
          className="w-24 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="End Time (HH:MM:SS or MM:SS)"
          value={timestampEnd}
          onChange={(e) => setTimestampEnd(e.target.value)}
          className="w-24 p-2 border border-gray-300 rounded"
        />
        <button type="button" onClick={addCaption} className="bg-green-500 text-white px-4 py-2 rounded">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold ">Captions List:</h2>
        <p className='text-red-500 text-sm mb-4'>Note: Double click to edit* </p>
        <CaptionTable captions={captions} setCaptions={setCaptions}/>
      </div>
    </div>
  );
}

export default CaptionInput;
