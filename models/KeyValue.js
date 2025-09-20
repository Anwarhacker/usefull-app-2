import mongoose from "mongoose";

const KeyValueSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.KeyValue ||
  mongoose.model("KeyValue", KeyValueSchema);
