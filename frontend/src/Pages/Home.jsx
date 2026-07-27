import "../App.css";

import { Card } from "../Components/Card";
import { Filter } from "../Components/Bookfilter";

export const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>

          <p>
            Welcome to ELW, your digital library where you can explore
            thousands of books, borrow them online, and enjoy reading anytime,
            anywhere.
          </p>

          <button className="hero-btn">Browse Books</button>
        </div>
      </section>

      <section className="book-section">
        <div className="book-wrapper">
          <div className="filter-wrapper">
            <Filter />
          </div>

          <div className="books-wrapper">
            <Card />
          </div>
        </div>
      </section>
    </>
  );
};