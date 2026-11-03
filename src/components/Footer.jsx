import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2>Wanderly.</h2>
        <p>Travel more. Worry less. Discover the world.</p>
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/bookings">My Bookings</Link>
      </div>

      <p>© 2026 Wanderly Travel. All rights reserved.</p>
    </footer>
  );
}

export default Footer;