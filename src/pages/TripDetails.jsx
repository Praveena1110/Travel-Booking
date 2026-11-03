import { Link, useParams } from "react-router-dom";
import { MapPin, Star, Clock, CheckCircle } from "lucide-react";
import trips from "../data/trips";

function TripDetails() {
  const { id } = useParams();

  const trip = trips.find(item => item.id === Number(id));

  if (!trip) {
    return (
      <div className="empty-state">
        <h2>Destination not found!</h2>
        <Link to="/destinations" className="primary-btn">
          Browse Destinations
        </Link>
      </div>
    );
  }

  return (
    <section className="details-section">
      <img className="details-image" src={trip.image} alt={trip.name} />

      <div className="details-layout">
        <div className="details-main">
          <span className="eyebrow">{trip.category} EXPERIENCE</span>
          <h1>{trip.name}</h1>

          <div className="details-meta">
            <span><MapPin size={17} /> {trip.location}</span>
            <span><Star size={17} color="#e9a23b" /> {trip.rating}</span>
            <span><Clock size={17} /> {trip.days} Days</span>
          </div>

          <h2>About this journey</h2>
          <p>{trip.description}</p>

          <h2>What's included?</h2>
          <div className="highlights-grid">
            {trip.highlights.map((item, index) => (
              <div key={index}>
                <CheckCircle size={19} />
                {item}
              </div>
            ))}
          </div>

          <h2>Your travel itinerary</h2>
          <div className="itinerary">
            {trip.itinerary.map((day, index) => (
              <div className="itinerary-item" key={index}>
                <span>0{index + 1}</span>
                <p>{day}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="price-card">
          <span>PACKAGE PRICE</span>
          <h2>₹{trip.price.toLocaleString("en-IN")}</h2>
          <p>Per person</p>
          <hr />
          <p>✓ {trip.days} days travel experience</p>
          <p>✓ Selected package inclusions</p>
          <Link to={`/booking/${trip.id}`} className="primary-btn full-btn">
            Book This Trip →
          </Link>
          <small>No payment required for this demo.</small>
        </aside>
      </div>
    </section>
  );
}

export default TripDetails;