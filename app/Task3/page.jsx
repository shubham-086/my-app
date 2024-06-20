"use client";
import React, { useEffect, useState } from "react";

const Task3 = () => {
  const correctWord = "accommodate";
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    setFeedbackMessage("");
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    if (userInput === "") {
      setFeedbackMessage("Please enter your answer");
    } else if (userInput.trim().toLowerCase() === correctWord.toLowerCase()) {
      setFeedbackMessage("Your spelling is correct");
      setIsCorrect(true);
    } else {
      setFeedbackMessage(
        `Your spelling is incorrect. The correct spelling is: "${correctWord}"`
      );
      setIsCorrect(false);
    }
  };

  const handleTryAgain = () => {
    setUserInput("");
    setFeedbackMessage("");
    setIsCorrect(null);
  };

  useEffect(() => {
    document.getElementById("wordInput").focus();
  }, []);

  return (
    <div className="mt-48 mx-40">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Listen to the audio and type the word
        </h1>
        <audio controls className="mx-auto mb-4 mt-10">
          <source src="/audio/audio2.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <input
          id="wordInput"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={handleTryAgain}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
        {feedbackMessage && (
          <div className="mt-4">
            <p
              className={`text-lg ${
                isCorrect === true
                  ? "text-green-500"
                  : isCorrect === false
                  ? "text-red-500"
                  : ""
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

export default Task3;
