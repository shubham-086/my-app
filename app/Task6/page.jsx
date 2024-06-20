"use client";

import React, { useState } from "react";

const sentence = "The quick brown fox jumps over the lazy dog";
const correctWords = ["quick", "lazy"];

const Task5 = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    const isSelectionCorrect =
      JSON.stringify(correctWords) === JSON.stringify(selectedWords);

    if (isSelectionCorrect) {
      setFeedbackMessage("Your selection is correct");
      setIsCorrect(true);
    } else {
      setFeedbackMessage(
        `Your selection is incorrect. The correct words are ${correctWords.join(
          ", "
        )}.`
      );
      setIsCorrect(false);
    }
  };

  const handleRetry = () => {
    setSelectedWords([]);
    setFeedbackMessage("");
    setIsCorrect(null);
  };

  return (
    <div className="mt-48 mx-40">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Select the adjectives in the sentence
        </h1>
        <div className="text-lg font-semibold mb-6 mt-10">
          {sentence.split(" ").map((word, index) => (
            <span
              key={index}
              onClick={() => handleWordClick(word)}
              className={`cursor-pointer mx-1 p-1 ${
                selectedWords.includes(word) ? "bg-blue-300" : "bg-transparent"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={handleRetry}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
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
