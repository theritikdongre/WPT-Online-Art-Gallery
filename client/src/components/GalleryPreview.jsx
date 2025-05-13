import React from "react";
import "./Components.css"; // We'll style it cleanly

const images = ["art-1.jpg", "art-2.jpeg", "art-3.webp", "art-4.jpeg"];

const GalleryPreview = () => {
  return (
    <section className="gallery-preview">
      <h3>Explore Featured Artworks</h3>
      <div className="preview-grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={`/${img}`}
            alt={`Artwork ${index + 1}`}
            className="preview-image"
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryPreview;
