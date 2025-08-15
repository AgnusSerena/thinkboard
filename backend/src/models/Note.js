import mongoose from "mongoose";

// create a schema
//create a model for schema

const nodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("Note", nodeSchema);
export default Note;
