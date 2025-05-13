import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photos.css";
import Navbar from "../../components/Navbar";

const Photos = () => {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/art/get-arts", {
        withCredentials: true, // ✅ send cookies with request
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setArts(response.data.data);
      } else {
        setArts([]);
      }
    } catch (error) {
      console.error("Error fetching arts:", error);
      setArts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="photos-page">
        <h2>User Uploaded Artworks</h2>
        {loading ? (
          <p>Loading...</p>
        ) : arts.length === 0 ? (
          <p>No arts uploaded yet.</p>
        ) : (
          <div className="photos-grid">
            {arts.map((photo) => (
              <div key={photo._id} className="photo-card">
                <img src={photo.imageUrl} alt={photo.artName} />
                <div className="photo-info">
                  <h4>{photo.artName}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Photos;
