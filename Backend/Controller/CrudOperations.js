const Plant = require("../Schema/UserPlantData");
exports.addBookMarks = async (req, res) => {
  try {
    const { bookmarks, userid } = req.body;

    const finduser = await Plant.findById(userid);

    if (!finduser) {
      return res.status(404).json({ error: "User not found" });
    }

    // If BookMarks already has a value, you might want to handle that here
    finduser.BookMarks = bookmarks; // Replace with new bookmark content

    await finduser.save();
    res.status(200).json({ message: "Bookmark added/updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.UpdateBookMarks = async (req, res) => {
  const { userid, content } = req.body;

  try {
    const result = await Plant.updateOne(
      { _id: userid },
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
  const { userid } = req.body;

  try {
    const result = await Plant.updateOne(
      { _id: userid },
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
