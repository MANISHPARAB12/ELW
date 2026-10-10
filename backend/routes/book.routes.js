const express = require("express");

const {
  getBooks,
  getBookID
} = require("../controller/book.controller");

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookID);

module.exports = router;