import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({ Data, setVoiceData }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [micActive, setMicActive] = useState(false);

  useEffect(() => {
    if (micActive) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [micActive]);

  useEffect(() => {
    if (transcript !== '') {
      setVoiceData(transcript);
    }
  }, [transcript, setVoiceData]);

  const handleClick = (e) => {
    e.preventDefault();
    setMicActive(!micActive);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={handleClick}>{micActive ? 'Stop' : 'Start'}</button>
      <p className='opacity-0'>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
