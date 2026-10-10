
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Css/Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("authChange", checkLogin);
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("authChange", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setIsOpen(false);

    window.dispatchEvent(new Event("authChange"));

    navigate("/Login", { replace: true });
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        ELW
      </Link>

      <button
        type="button"
        className="menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <img
          src={
            isOpen
              ? "https://img.icons8.com/?size=100&id=8112&format=png&color=ffffff"
              : "https://img.icons8.com/?size=100&id=8113&format=png&color=ffffff"
          }
          alt=""
          width="30"
        />
      </button>

      <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/" className="nav-links" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/MyBorrow"
            className="nav-links"
            onClick={closeMenu}
          >
            MyBorrow
          </Link>
        </li>

        <li>
          <Link
            to="/Contact"
            className="nav-links"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>

        <li>
          {isLoggedIn ? (
            <button
              type="button"
              className="nav-links logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/Login"
              className="nav-links"
              onClick={closeMenu}
            >
              Login / SignUp
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
