import Art from "../model/art.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";




export const uploadArt = async (req, res) => {
  try {
    const { artName } = req.body;
    const file = req.file;

    if (!artName || !file) {
      return res.status(400).json({ success: false, message: "artName and file are required" });
    }

    // Convert file to Data URI
    const fileUri = getDataUri(file);

    // Upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(fileUri.content, {
      folder: "artGallery",
    });

    // Save to MongoDB
    const newArt = await Art.create({
      artName,
      imageUrl: uploaded.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Artwork uploaded successfully",
      art: newArt,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getAllArt = async (req, res) => {
  try {
    const arts = await Art.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({
      success: true,
      data: arts,
    });
  } catch (error) {
    console.error("Error fetching art:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching art.",
    });
  }
};



// Helper to extract public_id from Cloudinary URL
const extractPublicId = (url) => {
  const parts = url.split('/');
  const fileWithExtension = parts[parts.length - 1];
  const publicId = fileWithExtension.split('.')[0];
  return `artGallery/${publicId}`;
};

export const deleteArt = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the document and get it in one step
    const art = await Art.findByIdAndDelete(id);

    if (!art) {
      return res.status(404).json({ success: false, message: "Artwork not found" });
    }

    // Delete image from Cloudinary
    const publicId = extractPublicId(art.imageUrl);
    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: "Artwork deleted successfully",
    });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


