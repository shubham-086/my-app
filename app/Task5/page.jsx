"use client";

import React, { useState, useEffect } from "react";

const Task5 = () => {
  const displayedSentence = "Hello and welcome to my website";

  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  let recognition;

  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    recognition = window.SpeechRecognition
      ? new window.SpeechRecognition()
      : new window.webkitSpeechRecognition();
  }

  const startRecording = () => {
    setIsRecording(true);
    setRecordingComplete(false);
    recognition.continuous = true;
    recognition.lang = "en-IN";
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const { transcript } = event.results[0][0];
      console.log(event);
      setTranscript(transcript);
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      setRecordingComplete(true);
      validateSpeech();
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const validateSpeech = () => {
    if (transcript.toLowerCase().trim() === displayedSentence.toLowerCase()) {
      setFeedbackMessage("You have spoken the sentence correctly");
      setIsCorrect(true);
    } else {
      setFeedbackMessage(
        `Your pronunciation is incorrect. Please try again. (Expected: "${displayedSentence}")`
      );
      setIsCorrect(false);
    }
  };

  const handleRetry = () => {
    setTranscript("");
    setFeedbackMessage("");
    setIsCorrect(null);
    setRecordingComplete(false);
    setIsRecording(false);
  };

  return (
    <div className="mt-48 mx-40">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Read the sentence aloud and record your voice
        </h1>
        <div className="text-lg font-semibold mb-6 mt-10">
          {displayedSentence}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleToggleRecording}
            className={`text-white py-2 px-4 rounded hover:bg-opacity-90 ${
              isRecording
                ? "bg-red-500 hover:bg-red-700"
                : "bg-green-500 hover:bg-green-700"
            }`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          <button
            onClick={handleRetry}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 ml-10"
          >
            Retry
          </button>
        </div>
        <p className="my-10">{transcript}</p>
        {feedbackMessage && (
          <div className="mt-4">
            <p
              className={`text-lg ${
                isCorrect === true ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedbackMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task5;
