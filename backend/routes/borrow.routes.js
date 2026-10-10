
const express = require("express");
const router = express.Router();

const {
  borrowBook,
  getMyBorrows,
  returnBook,
} = require("../controller/borrow.controller");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, borrowBook);
router.get("/my-books", authMiddleware, getMyBorrows);
router.patch("/:borrowId/return", authMiddleware, returnBook);

module.exports = router;
    