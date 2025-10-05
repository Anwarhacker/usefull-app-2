import mongoose from "mongoose";

const WebsiteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["AI", "AI Agent", "Deployed"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Website ||
  mongoose.model("Website", WebsiteSchema);