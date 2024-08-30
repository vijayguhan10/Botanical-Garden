const credentialSchema = require("../Schema/Login"); // Assuming this is your Mongoose model
const bcrypt = require("bcryptjs");

exports.Signup = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    const existingUser = await credentialSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new credentialSchema({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    const user = await credentialSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
