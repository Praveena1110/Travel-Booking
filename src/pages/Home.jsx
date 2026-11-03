import { Link } from "react-router-dom";
import { ArrowRight, Globe, ShieldCheck, Headphones } from "lucide-react";
import trips from "../data/trips";
import TripCard from "../components/TripCard";

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">✦ YOUR NEXT ADVENTURE STARTS HERE</span>

          <h1>
            The world is
            <br />
            waiting <span>for you.</span>
          </h1>

          <p>
            Discover extraordinary destinations and create
            beautiful memories with carefully designed travel experiences.
          </p>

          <Link to="/destinations" className="primary-btn">
            Explore Destinations <ArrowRight size={18} />
          </Link>

          <div className="hero-stats">
            <div><strong>50+</strong><small>Destinations</small></div>
            <div><strong>2K+</strong><small>Happy Travelers</small></div>
            <div><strong>4.9★</strong><small>Average Rating</small></div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200"
            alt="Beautiful mountain lake"
          />
          <div className="floating-card">
            <span>✦ Popular escape</span>
            <h3>Swiss Alps</h3>
            <p>Starting from ₹79,999</p>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div><Globe /><h3>Explore Anywhere</h3><p>Discover amazing destinations.</p></div>
        <div><ShieldCheck /><h3>Safe Booking</h3><p>Simple and secure booking experience.</p></div>
        <div><Headphones /><h3>Travel Support</h3><p>We make every trip easier.</p></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>Popular destinations<span>.</span></h2>
            <p>Find your perfect escape from our favourite places.</p>
          </div>

          <Link to="/destinations" className="text-link">
            View all destinations <ArrowRight size={17} />
          </Link>
        </div>

        <div className="trip-grid">
          {trips.slice(0, 3).map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      <section className="promo-section">
        <div>
          <span className="eyebrow">MAKE MEMORIES, NOT PLANS</span>
          <h2>Your next chapter<br />begins with a journey.</h2>
          <Link to="/destinations" className="primary-btn">
            Find your trip <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;