const plantSchema = require("../Schema/UserPlantData");
exports.uploaddata = async (req, res) => {
  try {
    let { filename } = req.file;
    filename = "new";
    const {
      userId,
      plantname,
      commonname,
      commonDescription,
      medicinaltips,
      referenceHyperlink,
    } = req.body;

    const plant = new plantSchema({
      userId,
      plantname,
      commonname,
      commonDescription,
      medicinaltips,
      referenceHyperlink,
      ThreeD_Model: {
        filename,
        contentType: "application/octet-stream",
        data: req.file.buffer,
      },
    });
    console.log(filename);
    await plant.save();
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports. getPlantData = async (req, res) => {
  try {
    const plantId = req.params.id; 

    const plant = await plantSchema.findById(plantId);

    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    const modelBuffer = plant.ThreeD_Model.data;

   
    res.json({
      filename: plant.ThreeD_Model.filename,
      data: modelBuffer.toString("base64"), 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
