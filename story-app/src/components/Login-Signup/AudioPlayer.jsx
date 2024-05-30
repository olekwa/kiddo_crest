import React from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ audioUrl, title, onClose }) => {
  return (
    <div className='audio-player-container'>
      <h2>{title}</h2>
      <audio controls autoPlay>
        <source src={audioUrl} type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
      <button className='close-button' onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default AudioPlayer;
