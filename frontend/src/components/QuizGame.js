import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const questions = [
    {
      id: 1,
      question:
        "Which medicinal plant, commonly known as 'Indian ginseng,' is used to boost energy and reduce stress?",
      options: ["Ashwagandha", "Neem", "Tulsi", "Amla"],
      correctAnswer: "Ashwagandha",
    },
    {
      id: 2,
      question:
        "Which plant is known as the 'Miracle Tree' for its high nutritional value and medicinal properties?",
      options: ["Neem", "Moringa", "Brahmi", "Turmeric"],
      correctAnswer: "Moringa",
    },
    {
      id: 3,
      question:
        "What is the primary medicinal use of the Neem tree in traditional Indian medicine?",
      options: [
        "Digestive aid",
        "Antibacterial properties",
        "Memory enhancer",
        "Stress reliever",
      ],
      correctAnswer: "Antibacterial properties",
    },
    {
      id: 4,
      question:
        "Which medicinal plant, also known as 'Holy Basil,' is often used to treat respiratory conditions?",
      options: ["Tulsi", "Aloe Vera", "Ginger", "Mango"],
      correctAnswer: "Tulsi",
    },
    {
      id: 5,
      question:
        "Which Indian plant is known for its yellow-orange spice and has anti-inflammatory properties?",
      options: ["Cinnamon", "Cardamom", "Turmeric", "Pepper"],
      correctAnswer: "Turmeric",
    },
    {
      id: 6,
      question:
        "Which fruit is rich in Vitamin C and is used in Ayurveda to boost immunity and improve skin health?",
      options: ["Apple", "Amla", "Banana", "Grapes"],
      correctAnswer: "Amla",
    },
    {
      id: 7,
      question:
        "Which plant, also called 'Indian Pennywort,' is believed to enhance cognitive function?",
      options: ["Ashwagandha", "Brahmi", "Mint", "Lemon"],
      correctAnswer: "Brahmi",
    },
    {
      id: 8,
      question:
        "Which plant's gel is widely used for its soothing and healing properties on skin burns and wounds?",
      options: ["Tulsi", "Aloe Vera", "Neem", "Lavender"],
      correctAnswer: "Aloe Vera",
    },
    {
      id: 9,
      question:
        "Which Indian plant is known for its root, which is often used in traditional medicine to treat nausea and inflammation?",
      options: ["Ginger", "Sandalwood", "Pepper", "Basil"],
      correctAnswer: "Ginger",
    },
    {
      id: 10,
      question:
        "Which herb is used in Ayurveda to enhance digestion and is known for its aromatic seeds?",
      options: ["Fennel", "Rosemary", "Thyme", "Mint"],
      correctAnswer: "Fennel",
    },
  ];

  const handleAnswerSelection = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitted(true);

    try {
      const userId = localStorage.getItem("userid");
      const Score = calculateScore();
      const Name = localStorage.getItem("name");
      const response = await axios.post(
        "http://127.0.0.1:3000/botanicalgarden/Quizgame",
        {
          userId,
          Score,
          Name,
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating quiz score:", error);
      toast.error("Failed to update quiz score.");
    }
  };

  // Example function to calculate score
  const calculateScore = () => {
    // Calculate score based on userAnswers and questions
    return Object.keys(userAnswers).reduce((score, questionId) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      return (
        score + (userAnswers[questionId] === question.correctAnswer ? 10 : 0)
      );
    }, 0);
  };

  return (
    <div className="p-8 xl:mt-20">
      <ToastContainer />

      <h1 className="text-4xl font-josefin text-center mb-6">
        Welcome to Quiz Game
      </h1>

      {!isSubmitted ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-full xl:w-[80%] mb-4">
            <button
              className="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() =>
                setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))
              }
              disabled={currentQuestionIndex === 0}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div className="border p-4 xl:h-96 rounded-lg shadow-lg w-full max-w-xl">
              <h2 className="text-2xl font-semibold mb-4">
                {questions[currentQuestionIndex].question}
              </h2>
              <ul>
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <li key={index} className="mb-2">
                      <button
                        className={`p-2 border rounded-lg w-full ${
                          userAnswers[questions[currentQuestionIndex].id] ===
                          option
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          handleAnswerSelection(
                            questions[currentQuestionIndex].id,
                            option
                          )
                        }
                      >
                        {option}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <button
              className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() =>
                setCurrentQuestionIndex(
                  Math.min(currentQuestionIndex + 1, questions.length - 1)
                )
              }
              disabled={currentQuestionIndex === questions.length - 1}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          {currentQuestionIndex === questions.length - 1 && (
            <button
              className="mt-4 p-3 bg-green-600 text-white rounded-full hover:bg-green-800"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">Results</h2>
          <div className="flex flex-wrap justify-center">
            {questions.map((question) => (
              <div key={question.id} className="w-full md:w-1/2 p-4">
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    userAnswers[question.id] === question.correctAnswer
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  <h3 className="font-semibold mb-2">{question.question}</h3>
                  <p
                    className={`mb-1 ${
                      userAnswers[question.id] === question.correctAnswer
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    Your answer: {userAnswers[question.id]}
                  </p>
                  {userAnswers[question.id] !== question.correctAnswer && (
                    <p className="text-green-700">
                      Correct answer: {question.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
