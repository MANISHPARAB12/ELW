
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css/MyBorrow.css";

const API_URL = import.meta.env.VITE_Book_URL;

export const MyBorrow = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBorrows = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your borrowing history.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/borrows/my-books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Your backend controller returns { success, count, borrows }.
      const borrowedBooks = response.data.borrows;

      if (!Array.isArray(borrowedBooks)) {
        throw new Error("Invalid borrowing history response.");
      }

      setBooks(borrowedBooks);
    } catch (err) {
      console.error(
        "Fetch borrowing history error:",
        err.response?.data || err.message
      );

      if (err.response?.status === 401) {
        setError("Your login session is invalid or expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to retrieve borrowing history."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in again.");
        return;
      }

      await axios.patch(
        `${API_URL}/borrows/${borrowId}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchMyBorrows();
    } catch (err) {
      console.error(
        "Return book error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message || "Unable to return the book."
      );
    }
  };

  useEffect(() => {
    fetchMyBorrows();
  }, []);

  if (loading) {
    return <div className="myborrow-container">Loading borrowing history...</div>;
  }

  if (error && books.length === 0) {
    return (
      <div className="myborrow-container">
        <p className="myborrow-error">{error}</p>
        <Link to="/Login">Go to Login</Link>
        <button onClick={fetchMyBorrows}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="myborrow-container">
      <h1>My Borrowed Books</h1>

      {error && <p className="myborrow-error">{error}</p>}

      {books.length === 0 ? (
        <div className="empty-borrows">
          <h2>No borrowed books yet</h2>
          <p>Browse the library and borrow a book to see it here.</p>
          <Link to="/Home" className="browse-books-btn">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="borrow-grid">
          {books.map((borrow) => {
            const book = borrow.bookId;

            if (!book) {
              return (
                <div className="borrow-card" key={borrow._id}>
                  <p>Book details are unavailable.</p>
                </div>
              );
            }

            return (
              <div className="borrow-card" key={borrow._id}>
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title || "Book cover"}
                    className="borrow-book-image"
                  />
                )}

                <div className="borrow-book-details">
                  <h2>{book.title}</h2>
                  <p>
                    <strong>Author:</strong> {book.author || "Unknown"}
                  </p>

                  <p>
                    <strong>Borrowed:</strong>{" "}
                    {borrow.borrowedAt
                      ? new Date(borrow.borrowedAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Due date:</strong>{" "}
                    {borrow.dueDate
                      ? new Date(borrow.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {borrow.status || "borrowed"}
                  </p>

                  {borrow.status === "borrowed" && (
                    <button
                      className="return-book-btn"
                      onClick={() => handleReturn(borrow._id)}
                    >
                      Return Book
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};