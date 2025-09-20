import mongoose from "mongoose";

const CommandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    command: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Command ||
  mongoose.model("Command", CommandSchema);
