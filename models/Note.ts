import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is a required field."],
    },
    content: {
      type: String,
      required: [true, "Content is a required field."],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: [true, "Author ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
