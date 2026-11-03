import { Link } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";

function TripCard({ trip }) {
  return (
    <div className="trip-card">
      <div className="trip-image">
        <img src={trip.image} alt={trip.name} />
        <span className="category-tag">{trip.category}</span>
      </div>

      <div className="trip-content">
        <div className="trip-location">
          <MapPin size={15} />
          {trip.location}
        </div>

        <h3>{trip.name}</h3>

        <div className="trip-info">
          <span><Star size={15} fill="#e9a23b" color="#e9a23b" /> {trip.rating}</span>
          <span><Clock size={15} /> {trip.days} Days</span>
        </div>

        <div className="trip-bottom">
          <div>
            <small>Starting from</small>
            <h3>₹{trip.price.toLocaleString("en-IN")}</h3>
          </div>

          <Link to={`/trip/${trip.id}`} className="view-btn">
            Explore ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TripCard;