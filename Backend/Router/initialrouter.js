const express = require("express");
const router = express.Router();
const credentials = require("../Controller/Credentials");
const uploadplantdata = require("../Controller/plantdata");
const CRUD = require("../Controller/CrudOperations");
const quizgame = require("../Controller/QuizController");
router.post("/newuser/signup", credentials.Signup);
router.post("/newuser/login", credentials.Login);
router.post("/plantdata", uploadplantdata.uploaddata);
router.post("/Quizgame", quizgame.quizgame);
router.get("/LeaderBoardQuizGame", quizgame.GetQuizInformation);
router.get("/plantdata/fetch", uploadplantdata.getdata);
router.post("/AddBookMarks", CRUD.addBookMarks);
router.post("/updateBookMarks", CRUD.UpdateBookMarks);
router.post("/DeleteBookMarks", CRUD.DeleteBookMarks);

module.exports = router;
