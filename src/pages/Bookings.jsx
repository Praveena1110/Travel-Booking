import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, MapPin, CalendarDays, Users } from "lucide-react";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("wanderlyBookings") || "[]"
    );
    setBookings(saved);
  }, []);

  const deleteBooking = id => {
    const updated = bookings.filter(item => item.id !== id);

    localStorage.setItem(
      "wanderlyBookings",
      JSON.stringify(updated)
    );

    setBookings(updated);
  };

  return (
    <section className="page-section">
      <div className="page-banner">
        <span className="eyebrow">YOUR TRAVEL DIARY</span>
        <h1>My <span>bookings.</span></h1>
        <p>All your upcoming adventures, together in one place.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✈</div>
          <h2>No bookings yet!</h2>
          <p>Your next adventure is just one click away.</p>
          <Link to="/destinations" className="primary-btn">
            Explore Destinations →
          </Link>
        </div>
      ) : (
        <div className="booking-list">
          <h2>{bookings.length} Booking(s) Found</h2>

          {bookings.map(booking => (
            <div className="booking-card" key={booking.id}>
              <img src={booking.image} alt={booking.tripName} />

              <div className="booking-card-content">
                <div className="booking-top">
                  <div>
                    <span className="eyebrow">TRAVEL PACKAGE</span>
                    <h2>{booking.tripName}</h2>
                    <p><MapPin size={15} /> {booking.location}</p>
                  </div>

                  <span className="status-tag">{booking.status}</span>
                </div>

                <div className="booking-details">
                  <span><CalendarDays size={16} /> {booking.date}</span>
                  <span><Users size={16} /> {booking.travellers} Traveller(s)</span>
                </div>

                <div className="booking-bottom">
                  <div>
                    <small>Total Amount</small>
                    <h3>₹{booking.total.toLocaleString("en-IN")}</h3>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Bookings;