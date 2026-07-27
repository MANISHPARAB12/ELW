import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Card = () => {
  const [books, setBooks] = useState([]);
  

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categories = searchParams.getAll("category");

    axios.get("http://localhost:4000/books").then((res) => {
      if (categories.length === 0) {
        setBooks(res.data);
      } else {
        const filteredBooks = res.data.filter((book) =>
          categories.includes(book.category)
        );

        setBooks(filteredBooks);
      }
    });
  }, [searchParams]);

  

  return (
    <>
      <div className="books-container">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <img
              src={book.image}
              alt={book.title}
              className="book-img"
            />

            <h3>{book.title}</h3>

            <p>{book.author}</p>

            <p>{book.category}</p>

            <h2>₹{book.price}</h2>
          </div>
        ))}
      </div>

      
    </>
  );
};