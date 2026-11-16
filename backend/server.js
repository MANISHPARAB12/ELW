
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");

dotenv.config({
  path: ".env.production",
});

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const server = express();

// Middleware
server.use(cors());
server.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Route imports
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const borrowRoutes = require("./routes/borrow.routes");
const contactRoutes = require("./routes/contact.routes");

// API routes
server.use("/api/books", bookRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/borrows", borrowRoutes);
server.use("/api/contact", contactRoutes);

// Handle unknown routes
server.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Start server
const PORT = process.env.PORT || 4040;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
