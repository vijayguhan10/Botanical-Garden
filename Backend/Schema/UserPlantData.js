const mongoose = require("mongoose");
const threeDModelSchema = new mongoose.Schema({
  filename: { type: String, require: true },
  contentType: {
    type: String,
    default: "application/octet-stream",
  },
  data: {
    type: Buffer,
    required: true,
  },
});

const plantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  plantname: {
    type: String,
    required: true,
  },
  commonname: {
    type: String,
  },
  commonDescription: {
    type: String,
    required: true,
  },
  medicinaltips: {
    type: String,
    required: true,
  },
  referenceHyperlink: {
    type: String,
    required: true,
  },
  ThreeD_Model: threeDModelSchema,
  BookMarks: {
    type: String,
  },
});

module.exports = mongoose.model("Plant", plantSchema);
