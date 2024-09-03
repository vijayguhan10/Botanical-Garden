const Plant = require("../Schema/UserPlantData");
const User = require("../Schema/Login");
exports.uploaddata = async (req, res) => {
  try {
    const {
      userId,
      plantname,
      commonname,
      commonDescription,
      medicinaltips,
      referenceHyperlink,
      ImageUrl,
    } = req.body;
    const dataprocess = await User.findById(userId);
    if (!dataprocess) {
      res.status(400).json({ message: "Invalid Login Failed" });
    }
    const plant = new Plant({
      userId,
      plantname,
      commonname,
      commonDescription,
      medicinaltips,
      referenceHyperlink,
      ImageUrl,
      BookMarks: "",
    });

    await plant.save();
    res.status(200).json({ message: "Plant data uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getdata = async (req, res) => {
  const { userId } = req.query; // Get userId from query parameters

  if (!userId) {
    return res.status(400).json({ message: "Oops, Invalid Data Passed" });
  }

  try {
    const plants = await Plant.find({ userId: userId });

    if (plants.length === 0) {
      return res
        .status(404)
        .json({ message: "No plants found for this userId" });
    }

    res.status(200).json({ message: "Data Fetched", PlantData: plants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
