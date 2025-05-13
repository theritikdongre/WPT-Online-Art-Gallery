import React, { useState } from "react";
import axios from "axios";
import './PostArt.css'
import Navbar from '../../components/Navbar.jsx'

const ArtUpload = () => {
  const [artName, setArtName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!artName || !image) {
      setMessage("Please provide both art name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("artName", artName); // Append art name
    formData.append("imageUrl", image);     // Append image file

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/art/upload", // Replace with your backend URL
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (response.data.success) {
        setMessage("Art uploaded successfully!");
        setArtName(""); // Reset the form field
        setImage(null);  // Reset the image field
      } else {
        setMessage("Failed to upload art.");
      }
    } catch (error) {
      console.error("Error uploading art:", error);
      setMessage("Error uploading art.");
    }
  };

  return (
   <>
<Navbar/>
    <div className="art-upload">
      <h2>Upload Your Art</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="artName">Art Name:</label>
          <input
            type="text"
            id="artName"
            value={artName}
            onChange={(e) => setArtName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
       </> 
  );
};

export default ArtUpload;
