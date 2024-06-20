"use client";
import React, { useState } from "react";

const images = [
  { src: "/images/image3.jpg", id: "A" },
  { src: "/images/image2.jpg", id: "B" },
  { src: "/images/image1.jpg", id: "C" },
  { src: "/images/image4.jpg", id: "D" },
];

const correctAnswer = "C";

const Task1 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleImageClick = (id) => {
    setSelectedImage(id);
    setFeedbackMessage("");
  };

  const handleSubmit = () => {
    if (selectedImage === null) {
      setFeedbackMessage("Please select an image.");
    } else if (selectedImage === correctAnswer) {
      setFeedbackMessage("Success! You selected the correct image.");
    } else {
      setFeedbackMessage("Error! You selected the wrong image.");
    }
  };

  const handleTryAgain = () => {
    setSelectedImage(null);
    setFeedbackMessage("");
  };

  return (
    <div className="mt-20 mx-40">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Select the image which contains a football
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-20">
          {images.map((image) => (
            <div
              key={image.id}
              className={`border-4 p-2 d-flex mx-auto items-center content-center ${
                selectedImage === image.id
                  ? "border-blue-500"
                  : "border-transparent"
              } cursor-pointer`}
              onClick={() => handleImageClick(image.id)}
            >
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="w-2/4 h-auto d-flex mx-auto"
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          {feedbackMessage && (
            <p
              className={`text-lg ${
                feedbackMessage.includes("Success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {feedbackMessage}
            </p>
          )}
          <div className="mt-10 flex justify-center space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            {feedbackMessage && (
              <button
                onClick={handleTryAgain}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task1;
