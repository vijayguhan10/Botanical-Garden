const user = require("../Schema/Login");
const Quiz = require("../Schema/Quiz");

exports.quizgame = async (req, res) => {
  const { userId, Score, Name } = req.body;
  console.log("Quiz details", req.body);

  try {
    const UserAuth = await user.findById(userId);
    console.log("UserAuth", UserAuth);
    if (!UserAuth) {
      return res.status(400).json({ message: "Sorry, Invalid Login" });
    }

    const QuizCheck = await Quiz.findOne({ userId: userId });
    console.log("Quizcheck", QuizCheck);
    if (QuizCheck) {
      QuizCheck.Score += Score;
      await QuizCheck.save();
      return res.status(200).json({ message: "Score Updated Successfully" });
    } else {
      const newUser = new Quiz({
        userId,
        Score,
        Name,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "New user detail updated successfully" });
    }
  } catch (error) {
    console.error("Error updating quiz score:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.GetQuizInformation = async (req, res) => {
  try {
    const sortedQuizzes = await Quiz.find().sort({ Score: -1 });

    return res.status(200).json(sortedQuizzes);
  } catch (error) {
    console.error("Error fetching quiz information:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
