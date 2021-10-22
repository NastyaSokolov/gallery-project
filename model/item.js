import pkg from "mongoose";
const { Schema, model } = pkg;
const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image_b: { type: String, required: true },
  image_l: { type: String, required: true },
  image_m: { type: String, required: true },
});

export default model("Picture", schema);
