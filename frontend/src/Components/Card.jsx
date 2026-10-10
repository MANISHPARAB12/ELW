import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_Book_URL;

export const Card = () => {
  const [books, setBooks] = useState([]);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get("search") || "";

    const categories = searchParams.getAll("category");

    axios
      .get(`${API_URL}/books`)
      .then((res) => {
        let filteredBooks = res.data;

        // =========================
        // SEARCH FILTER
        // =========================
        if (search.trim() !== "") {
          filteredBooks = filteredBooks.filter((book) => {
            const searchText = search.toLowerCase().trim();

            return (
              book.title
                ?.toLowerCase()
                .includes(searchText) ||

              book.author
                ?.toLowerCase()
                .includes(searchText) ||

              book.category
                ?.toLowerCase()
                .includes(searchText)
            );
          });
        }

        // =========================
        // CATEGORY FILTER
        // =========================
        if (categories.length > 0) {
          filteredBooks = filteredBooks.filter((book) =>
            categories.includes(book.category)
          );
        }

        setBooks(filteredBooks);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }, [searchParams]);

  return (
    <div className="books-container">

      {books.length === 0 ? (
        <h2>No books found</h2>
      ) : (
        books.map((book) => (
          <div
            className="card"
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <img
              src={book.image}
              alt={book.title}
              className="book-img"
            />

            <h3>{book.title}</h3>

            <p>{book.author}</p>

            <p>{book.category}</p>

            <h4>₹{book.price}</h4>
          </div>
        ))
      )}

    </div>
  );
};