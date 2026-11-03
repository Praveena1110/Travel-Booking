import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CalendarDays, Users } from "lucide-react";
import trips from "../data/trips";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const trip = trips.find(item => item.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    travellers: 1
  });

  const [error, setError] = useState("");

  if (!trip) {
    return (
      <div className="empty-state">
        <h2>Package not found</h2>
        <Link to="/destinations">Browse trips</Link>
      </div>
    );
  }

  const total = trip.price * Number(form.travellers);

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() ||
        !form.phone.trim() || !form.date) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (new Date(form.date + "T00:00:00") <= new Date(new Date().toDateString())) {
      setError("Please select a future travel date.");
      return;
    }

    const booking = {
      ...form,
      travellers: Number(form.travellers),
      id: Date.now(),
      tripId: trip.id,
      tripName: trip.name,
      location: trip.location,
      image: trip.image,
      price: trip.price,
      total: total,
      status: "Confirmed"
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("wanderlyBookings") || "[]"
    );

    localStorage.setItem(
      "wanderlyBookings",
      JSON.stringify([...existingBookings, booking])
    );

    navigate("/bookings");
  };

  return (
    <section className="booking-section">
      <div className="page-banner">
        <span className="eyebrow">LET'S MAKE IT HAPPEN</span>
        <h1>Book your <span>journey.</span></h1>
        <p>Just a few details between you and your next adventure.</p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Traveller information</h2>
          <p>Please enter your details below.</p>

          <label>Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />

          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10 digit mobile number"
            maxLength="10"
            required
          />

          <div className="form-row">
            <div>
              <label><CalendarDays size={16} /> Travel Date *</label>
              <input
                type="date"
                name="date"
                min={new Date(Date.now() + 86400000).toLocaleDateString("en-CA")}
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label><Users size={16} /> Travellers *</label>
              <select
                name="travellers"
                value={form.travellers}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "Person" : "People"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-btn full-btn">
            Confirm Booking →
          </button>
        </form>

        <aside className="booking-summary">
          <img src={trip.image} alt={trip.name} />
          <div className="summary-content">
            <span className="eyebrow">YOUR SELECTED TRIP</span>
            <h2>{trip.name}</h2>
            <p>{trip.location}</p>
            <hr />

            <div className="summary-row">
              <span>Price per person</span>
              <strong>₹{trip.price.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-row">
              <span>Travellers</span>
              <strong>{form.travellers}</strong>
            </div>

            <div className="summary-row">
              <span>Duration</span>
              <strong>{trip.days} Days</strong>
            </div>

            <hr />

            <div className="summary-row total-row">
              <strong>Total Price</strong>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>
            <small>Demo booking only. No actual payment is collected.</small>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Booking;