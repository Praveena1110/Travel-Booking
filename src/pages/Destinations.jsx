import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import trips from "../data/trips";
import TripCard from "../components/TripCard";

function Destinations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchesSearch =
        trip.name.toLowerCase().includes(search.toLowerCase()) ||
        trip.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || trip.category === category;

      const matchesBudget =
        budget === "All" ||
        (budget === "Under 20000" && trip.price < 20000) ||
        (budget === "20000-40000" && trip.price >= 20000 && trip.price <= 40000) ||
        (budget === "Above 40000" && trip.price > 40000);

      return matchesSearch && matchesCategory && matchesBudget;
    });
  }, [search, category, budget]);

  return (
    <section className="page-section">
      <div className="page-banner">
        <span className="eyebrow">EXPLORE THE WORLD</span>
        <h1>Find your next <span>destination.</span></h1>
        <p>Beautiful places, unforgettable experiences.</p>
      </div>

      <div className="filter-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search destination or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <SlidersHorizontal size={18} />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>

        <div className="filter-box">
          <select value={budget} onChange={e => setBudget(e.target.value)}>
            <option value="All">All Budgets</option>
            <option value="Under 20000">Under ₹20,000</option>
            <option value="20000-40000">₹20,000 - ₹40,000</option>
            <option value="Above 40000">Above ₹40,000</option>
          </select>
        </div>
      </div>

      <div className="results-heading">
        <h2>Discover places</h2>
        <span>{filteredTrips.length} packages found</span>
      </div>

      {filteredTrips.length > 0 ? (
        <div className="trip-grid">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No destinations found!</h2>
          <p>Try changing your search or filters.</p>
          <button
            className="primary-btn"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBudget("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Destinations;