const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");

dotenv.config({
    path: ".env.production"
});

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const server = express();


server.use(express.json());
server.use(cors());

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const borrowRoutes = require("./routes/borrow.routes");

server.use("/api/books", bookRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/borrows", borrowRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});