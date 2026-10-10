
const mongoose = require("mongoose");
const Borrow = require("../models/borrow.models");
const Book = require("../models/book.models");

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID.",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      return res.status(409).json({
        success: false,
        message: "You have already borrowed this book.",
      });
    }

    const borrowedAt = new Date();
    const dueDate = new Date(borrowedAt);
    dueDate.setDate(dueDate.getDate() + 14);

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowedAt,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully.",
      borrow,
    });
  } catch (error) {
    console.error("Borrow book error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to borrow book.",
    });
  }
};

// Get the logged-in user's borrowing history
const getMyBorrows = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    const borrows = await Borrow.find({ userId })
      .populate("bookId")
      .sort({ borrowedAt: -1 });

    return res.status(200).json({
      success: true,
      count: borrows.length,
      borrows,
    });
  } catch (error) {
    console.error("Get borrowing history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve borrowing history.",
    });
  }
};

// Return a borrowed book
const returnBook = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { borrowId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    if (!mongoose.isValidObjectId(borrowId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid borrowing record ID.",
      });
    }

    const borrow = await Borrow.findOneAndUpdate(
      {
        _id: borrowId,
        userId,
        status: "borrowed",
      },
      {
        $set: {
          status: "returned",
          returnedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!borrow) {
      return res.status(404).json({
        success: false,
        message: "Active borrowing record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully.",
      borrow,
    });
  } catch (error) {
    console.error("Return book error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to return book.",
    });
  }
};

module.exports = {
  borrowBook,
  getMyBorrows,
  returnBook,
};
