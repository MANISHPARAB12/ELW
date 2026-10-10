
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api/api";
import "../Css/ProductDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [error, setError] = useState("");
  const [borrowMessage, setBorrowMessage] = useState("");
  const [borrowSuccess, setBorrowSuccess] = useState(false);

  // Fetch a single book
  useEffect(() => {
    let cancelled = false;

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/books/${id}`);
        const bookData = response.data.book ?? response.data;

        if (!cancelled) {
          setBook(bookData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load book details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (!id) {
      setError("Book ID is missing.");
      setLoading(false);
    } else {
      fetchBook();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Borrow the book
  const handleBorrow = async () => {
    if (borrowing || !book) return;

    setError("");
    setBorrowMessage("");
    setBorrowSuccess(false);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login", {
        state: {
          message: "Please log in before borrowing a book.",
          from: `/book/${id}`,
        },
      });
      return;
    }

    if (!book._id) {
      setBorrowMessage(
        "Book ID is missing. Check your backend book data."
      );
      return;
    }

    try {
      setBorrowing(true);

      const response = await api.post(
        "/borrows",
        { bookId: book._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBorrowSuccess(true);
      setBorrowMessage(
        response.data.message || "Book borrowed successfully!"
      );
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        setBorrowMessage(
          "Your login session is invalid or expired. Please log in again."
        );
      } else if (status === 404) {
        setBorrowMessage(
          "Borrow endpoint or book was not found. Check your backend routes."
        );
      } else if (status === 409) {
        setBorrowMessage(
          err.response?.data?.message ||
            "You have already borrowed this book."
        );
      } else {
        setBorrowMessage(
          err.response?.data?.message ||
            "Unable to borrow the book. Please try again."
        );
      }
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return <p className="details-status">Loading book details...</p>;
  }

  if (error) {
    return (
      <p className="details-status" role="alert">
        {error}
      </p>
    );
  }

  if (!book) {
    return <p className="details-status">Book not found.</p>;
  }

  return (
    <div className="details-container">
      <div className="imgcontainer">
        <img
          src={book.image}
          alt={book.title || "Book cover"}
        />
      </div>

      <div className="detail">
        <h1>{book.title}</h1>

        <h3>Author: {book.author || "Unknown"}</h3>

        <p>Category: {book.category || "Uncategorized"}</p>

        <p>Borrow: ₹{book.price ?? 0}</p>

        <p className="description">
          Description: {book.description || "No description available."}
        </p>

        <button
          className="borrowbtn"
          type="button"
          onClick={handleBorrow}
          disabled={borrowing || borrowSuccess}
        >
          {borrowing
            ? "Borrowing..."
            : borrowSuccess
              ? "Borrowed Successfully"
              : "Borrow Now"}
        </button>

        {borrowMessage && (
          <p
            className={borrowSuccess ? "borrow-success" : "borrow-error"}
            role="status"
          >
            {borrowMessage}
          </p>
        )}
      </div>
    </div>
  );
};
