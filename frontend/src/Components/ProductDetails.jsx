import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/ProductDetails.css"

export const ProductDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/books/${id}`)
      .then((res) => setBook(res.data));
  }, [id]);

  if (!book) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="details-container">
      <div className="imgcontainer">
      <img src={book.image} alt={book.title} />
      </div>

      <div className="detail">
        <h1>{book.title}</h1>

        <h3>Author: {book.author}</h3>

        <p>Category: {book.category}</p>

        <p>Borrow: ₹{book.price}</p>

        <p className="description">Description: {book.description}</p>

        <button className="borrowbtn">Borrow Now</button>
      </div>
    </div>
  );
};