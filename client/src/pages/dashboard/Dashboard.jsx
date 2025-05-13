import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.fullName);
    }
  }, []);

  // Fetch user uploaded arts
  const fetchArts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/art/get-arts", {
        withCredentials: true,
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

  // Delete art by ID
  const deletePost = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this art?");
      if (!confirmDelete) return;

      const response = await axios.delete(`http://localhost:8000/api/v1/art/delete/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setArts(arts.filter((art) => art._id !== id));
        alert("Art deleted successfully!");
      } else {
        alert("Failed to delete art.");
      }
    } catch (error) {
      console.error("Error deleting art:", error);
      alert("Error deleting art. Please try again.");
    }
  };

  useEffect(() => {
    fetchArts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="header">
          <img src="./profile.jpg" alt="User Profile" className="rounded-full" />
          <div>
            <h1>Welcome, {userName || "User"}</h1>
            <p>Manage your artwork gallery</p>
            <button className="post-art-btn" onClick={() => navigate("/post-art")}>
              Post Your Art
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container">
          <h2 className="text-3xl font-semibold mb-6">Your Artwork</h2>

          {loading ? (
            <p>Loading...</p>
          ) : arts.length === 0 ? (
            <p>No artworks uploaded yet.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Date Posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arts.map((art) => (
                    <tr key={art._id}>
                      <td>
                        <img
                          src={art.imageUrl}
                          alt={art.artName}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td>{art.artName}</td>
                      <td>{new Date(art.createdAt).toLocaleDateString()}</td>
                      <td className="actions">
                        <button onClick={() => deletePost(art._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
