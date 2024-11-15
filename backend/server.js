// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables
const cors = require("cors");

// Create an Express app instance
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins (you can limit it to specific origins if needed)
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define User and Blog Models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

// Utility functions for JWT
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = decoded;
    next();
  });
};

// User registration
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user",
    });
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate the JWT token
    const token = generateToken(user);

    // Respond with both the token and the user information
    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        id: user._id, // You can include any other user fields here
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
});

// Logout route
app.post("/logout", (req, res) => {
  // Invalidate the token on the frontend (e.g., by removing it from localStorage)
  res.json({ message: "Successfully logged out" });
});

// Authorization middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });
  next();
};

// CRUD Operations for Blog

// Create a blog (Admin only)
app.post("/blogs", verifyToken, requireAdmin, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, author: req.user.id });
    res.json({ message: "Blog created", blog });
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
});

// Read all blogs (Public access)
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "email");
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching blogs", error });
  }
});

// Update a blog (Admin only)
app.put("/blogs/:id", verifyToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog updated", blog });
  } catch (error) {
    res.status(400).json({ message: "Error updating blog", error });
  }
});

// Delete a blog (Admin only)
app.delete("/blogs/:id", verifyToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting blog", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
