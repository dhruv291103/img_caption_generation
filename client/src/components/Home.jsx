// Home.jsx

import { useState } from "react";
import axios from "axios";
import Upload from "./Upload";
import HeroSection from "./HeroSection";
import "../styles/loader.css"; // Import loader styles here

const Home = () => {
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Generate image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the image preview
    };
    if (file) {
      reader.readAsDataURL(file); // Read the image file as Data URL
    }
  };

  const handleGenerateCaption = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    setIsLoading(true); // Set loading state to true to display loader

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("http://localhost:3000/caption", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGeneratedCaption(response.data); // Set the generated caption
    } catch (error) {
      console.error("Error generating caption:", error);
      setGeneratedCaption("Error generating caption.");
    } finally {
      setIsLoading(false); // Set loading state to false when the process is complete
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <HeroSection />
      </section>

      <div className="max-w-screen-md flex flex-col items-center justify-center mx-auto mt-12 ps-4 p-6 bg-white dark:bg-gray-800 border-4 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
        {/* "Upload Images" Text */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Upload Images
          </h2>
        </div>

        {/* Upload Component */}
        <div className="flex items-center justify-center">
          <Upload onChange={handleFileChange} />
        </div>
      </div>

      {/* Image Preview Section */}
      {imagePreview && (
        <div className="max-w-screen-lg flex flex-wrap items-center justify-center mx-auto mt-8">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="w-1/2 h-auto object-contain border-2 border-gray-300 rounded-lg shadow-lg"
          />
        </div>
      )}

<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <textarea
    id="generated_text"
    value={generatedCaption}
    readOnly
    placeholder={
      generatedCaption === "" ? "Generated Caption will appear here" : ""
    }
    className="block w-3/4 sm:w-2/3 md:w-1/2 mx-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
    rows={1} // to make it start as a single row and expand
  />
</div>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <button
          onClick={handleGenerateCaption}
          disabled={isLoading} // Disable button when loading
          className="block hover:bg-purple-700 px-14 text-white bg-purple-600 rounded md:hover:bg-purple-700 md:border-0 md:hover:text-white font-bold md:px-14 py-4"
        >
          {isLoading ? "Generating..." : "Generate Caption"} {/* Change text while loading */}
        </button>
      </div>

      {/* Loader Component */}
      {isLoading && (
        <>
          {/* Page Overlay */}
          <div className="page-overlay"></div>
          {/* Loader */}
          <div className="loader-container mt-6">
            <div className="cube">
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
