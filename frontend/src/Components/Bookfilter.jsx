import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// import "../Css/Filter.css"

export const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.getAll("category") || []
  );

  useEffect(() => {
    axios.get("http://localhost:4000/books").then((res) => {
      const uniqueCategory = [
        ...new Set(res.data.map((book) => book.category)),
      ];

      setCategories(uniqueCategory);
    });
  }, []);

  const handleFilter = (e) => {
    const { name } = e.target;

    let newCategory = [...selectedCategory];

    if (newCategory.includes(name)) {
      newCategory = newCategory.filter((item) => item !== name);
    } else {
      newCategory.push(name);
    }

    setSelectedCategory(newCategory);
  };

  useEffect(() => {
    const params = {};

    if (selectedCategory.length > 0) {
      params.category = selectedCategory;
    }

    setSearchParams(params);
  }, [selectedCategory, setSearchParams]);

  return (<div className="filter">
    <h2>Categories</h2>

    <div className="category-grid">
        {categories.map((category) => (
            <div key={category} className="filtercheckbox">
                <input
                    type="checkbox"
                    name={category}
                    value={category}
                    checked={selectedCategory.includes(category)}
                    onChange={handleFilter}
                />

                <label>{category}</label>
            </div>
        ))}
    </div>
</div>
  );
};