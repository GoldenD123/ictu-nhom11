import mongoose from "mongoose";

const jobschema = new mongoose.Schema(
  {
    CName: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    add: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("jobs", jobschema);
