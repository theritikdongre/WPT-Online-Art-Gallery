
import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
  artName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const Art = mongoose.model("Art", artSchema);

export default Art;
