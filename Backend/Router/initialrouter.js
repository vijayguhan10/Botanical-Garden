// routes/index.js
const express = require("express");
const router = express.Router();
const credentials = require("../Controller/Credentials");
const uploadplantdata = require("../Controller/plantdata");
const CRUD = require("../Controller/CrudOperations");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/newuser/signup", credentials.Signup);
router.post("/newuser/login", credentials.Login);
router.post("/plantdata", upload.single("model"), uploadplantdata.uploaddata);
router.get("/plantdata/:id", uploadplantdata.getPlantData);
router.post("/AddBookMarks", CRUD.addBookMarks);
router.post("/updateBookMarks", CRUD.UpdateBookMarks);
router.post("/DeleteBookMarks", CRUD.DeleteBookMarks);

module.exports = router;
