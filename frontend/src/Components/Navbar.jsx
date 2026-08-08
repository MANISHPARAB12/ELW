import { Link } from "react-router-dom";
import { useState } from "react";
import "../Css/Navbar.css";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">

            <div className="logo">
                ELW
            </div>

            <button
                className="menu-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src={
                        isOpen
                            ? "https://img.icons8.com/?size=100&id=8112&format=png&color=ffffff"
                            : "https://img.icons8.com/?size=100&id=8113&format=png&color=ffffff"
                    }
                    alt={isOpen ? "Close menu" : "Open menu"}
                    width="30"
                />
            </button>

            <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to="/" className="nav-links">
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/MyBorrow" className="nav-links">
                        MyBorrow
                    </Link>
                </li>

                <li>
                    <Link to="/Login" className="nav-links">
                        Login
                    </Link>
                </li>

                <li>
                    <Link to="/Contact" className="nav-links">
                        Contact
                    </Link>
                </li>
            </ul>

        </nav>
    );
};