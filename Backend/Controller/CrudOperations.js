const Plant = require("../Schema/UserPlantData");
exports.addBookMarks = async (req, res) => {
  try {
    const { bookmarks, plantname } = req.body;
    console.log("Adding BookMarks", req.body);
    const finduser = await Plant.findOne({ plantname: plantname });
    console.log("Finding User", finduser);

    if (!finduser) {
      return res.status(404).json({ error: "User not found" });
    }
    finduser.BookMarks = bookmarks;

    await finduser.save();

    res.status(200).json({ message: "Bookmark added/updated successfully!" });
  } catch (error) {
    console.error("Error adding bookmarks:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateBookMarks = async (req, res) => {
  const { userId, content } = req.body;

  try {
    const result = await Plant.updateOne(
      { _id: userId },
      { $set: { BookMarks: content } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "No bookmarks updated" });
    }

    res.status(200).json({ message: "Bookmarks updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.DeleteBookMarks = async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await Plant.updateOne(
      { _id: userId },
      { $set: { BookMarks: "" } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "No bookmarks updated" });
    }

    res.status(200).json({ message: "Bookmarks updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
