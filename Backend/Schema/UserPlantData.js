const mongoose = require("mongoose");

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
  ImageUrl: {
    type: String,
    required: true,
  },
  BookMarks: {
    type: String,
  },
});

module.exports = mongoose.model("Plant", plantSchema);
