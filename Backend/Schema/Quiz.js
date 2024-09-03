const mongoose = require("mongoose");
const QuizSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  Score: {
    type: Number,
  },
  Name: {
    type: String,
  },
});
const Saveschema = mongoose.model("Quiz", QuizSchema);
module.exports = Saveschema;
