import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/SearchResults.css";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const category = queryParams.get("category");
  const type = queryParams.get("type");

  useEffect(() => {
    fetchResults();
  }, [location.search]);

  async function fetchResults() {
    let query = supabase.from("properties").select("*");

    if (city) {
      query = query.ilike("city", `%${city}%`);
    }

    if (category) {
      query = query.eq("category", category.toLowerCase());
    }

    if (type) {
      query = query.eq("property_type", type);
    }

    const { data, error } = await query;

    if (!error) {
      setProperties(data);
    }
  }

  return (
    <div className="search-page">
      <h2>Search Results</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="search-grid">
          {properties.map((property) => (
            <div
              key={property.id}
              className="search-card"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <img src={property.imageUrl} alt={property.title} />
              <div className="search-content">
                <h3>{property.title}</h3>
                <p>{property.city}</p>
                <p className="price">
                  ₹{Number(property.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
