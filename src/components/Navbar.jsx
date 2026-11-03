import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <Plane size={25} />
        Wanderly<span>.</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>

        <NavLink to="/destinations" onClick={closeMenu}>
          Destinations
        </NavLink>

        <NavLink to="/bookings" onClick={closeMenu}>
          My Bookings
        </NavLink>

        <Link
          to="/destinations"
          className="nav-button"
          onClick={closeMenu}
        >
          Explore Trips ↗
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;