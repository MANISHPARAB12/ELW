
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../Css/Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
      } catch {
        setUser(null);
      }
    };

    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("authChanged", updateUser);
    window.addEventListener("storage", updateUser);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("authChanged", updateUser);
      window.removeEventListener("storage", updateUser);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileOpen(false);
    setIsOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/Login", { replace: true });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const initials = (user?.name || "MP")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="navbar">
      <Link to="/Home" className="logo" onClick={closeMenu}>
        ELW
      </Link>

      <button
        type="button"
        className="menu-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/Home" className="nav-links" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/MyBorrow" className="nav-links" onClick={closeMenu}>
            MyBorrow
          </Link>
        </li>

        <li>
          <Link to="/Contact" className="nav-links" onClick={closeMenu}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/About" className="nav-links" onClick={closeMenu}>
            About 
          </Link>
        </li>

        <li className="profile-menu-item">
          {isLoggedIn ? (
            <div className="profile-wrapper" ref={profileRef}>
              <button
                type="button"
                className="profile-icon-btn"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <span className="profile-initials">
                  {initials || "MP"}
                </span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-user-info">
                    <div className="profile-avatar">
                      {initials || "MP"}
                    </div>

                    <div className="profile-user-text">
                      <p className="profile-name">
                        {user?.name || "Manish Parab"}
                      </p>

                      <p className="profile-email">
                        {user?.email || "Email unavailable"}
                      </p>
                    </div>
                  </div>

                  <div className="profile-divider" />

                  <Link
                    to="/Home"
                    className="profile-dropdown-link"
                    onClick={closeMenu}
                  >
                    <span>⌂</span>
                    Home
                  </Link>

                  <Link
                    to="/MyBorrow"
                    className="profile-dropdown-link"
                    onClick={closeMenu}
                  >
                    <span>▤</span>
                    My Borrowed Books
                  </Link>

                  <button
                    type="button"
                    className="profile-logout-btn"
                    onClick={handleLogout}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                      <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
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
