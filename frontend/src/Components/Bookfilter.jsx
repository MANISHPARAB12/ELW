import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_Book_URL;
 
export const Filter = () => {
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.getAll("category")
  );

  // =========================
  // GET CATEGORIES
  // =========================
  useEffect(() => {
    axios
      .get(`${API_URL}/books`)
      .then((res) => {
        const uniqueCategory = [
          ...new Set(
            res.data.map((book) => book.category)
          ),
        ];

        setCategories(uniqueCategory);
      })
      .catch((error) => {
        console.log("Category Error:", error);
      });
  }, []);

  // =========================
  // CATEGORY FILTER
  // =========================
  const handleFilter = (e) => {
    const category = e.target.name;

    setSelectedCategory((prev) => {
      if (prev.includes(category)) {
        return prev.filter(
          (item) => item !== category
        );
      }

      return [...prev, category];
    });
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // =========================
  // UPDATE URL
  // =========================
  useEffect(() => {
    const params = new URLSearchParams();

    // Search
    if (search.trim() !== "") {
      params.set("search", search);
    }

    // Categories
    selectedCategory.forEach((category) => {
      params.append("category", category);
    });

    setSearchParams(params);
  }, [
    search,
    selectedCategory,
    setSearchParams,
  ]);

  return (
    <div className="filter">

      {/* SEARCH */}
      <div className="search-section">

        <h2>Search Books</h2>

        <input
          type="text"
          placeholder="Search book..."
          value={search}
          onChange={handleSearch}
        />

      </div>

      {/* CATEGORIES */}
      <div className="category-section">

        <h2>Categories</h2>

        <div className="category-grid">

          {categories.map((category) => (
            <div
              key={category}
              className="filtercheckbox"
            >

              <input
                type="checkbox"
                name={category}
                value={category}
                checked={selectedCategory.includes(
                  category
                )}
                onChange={handleFilter}
              />

              <label>{category}</label>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};