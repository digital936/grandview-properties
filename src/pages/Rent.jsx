import { FaBed, FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/rent.css";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import ZillowButton from "../buttons/ZillowButton";

export default function Rent() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

      console.log("Fetched Data:", data);

      
    if (error) {
      console.log(error);
    } else {
      setProperties(data);
    }
  }

  const handleNavigate = (id) => {
    navigate(`/property/${id}`);
  };

  const handleScheduleTour = (id, e) => {
    e.stopPropagation();
    navigate(`/schedule-tour/${id}`);
  };

  const handleZillow = (zillowLink, e) => {
    e.stopPropagation();
    window.open(zillowLink, "_blank");
  };

  return (
    <div className="rent-page">
      <h1 className="page-title">Properties for Rent</h1>

      <div className="property-grid">

        {properties.length === 0 && <p>No properties found</p>}
        {properties.map((property) => (
          <div
            className="property-card"
            key={property.id}
            // onClick={() => handleNavigate(property.id)}
          >
            <div className="image-wrapper">
              <img src={property.imageUrl} alt={property.title} />

              <span className="offer-badge">OFFER</span>

              <span className="price-tag">
                ${Number(property.price).toLocaleString()}
              </span>
            </div>

            <div className="property-content">
              <h3>{property.title}</h3>

              <p className="location">{property.city}</p>

              

              <div className="property-info">
                  <span><FaBed size={22} /> {property.beds}</span>
                  <span><FaBath size={22} /> {property.baths}</span>
                  <span><BiArea size={22} /> {property.sqft} sqft</span>
              </div>

              <div className="card-buttons">

                <div className="top-row">
                  

                <ZillowButton zillowLink={property.zillow_url} />

                <ScheduleTourModal propertyId={property.id} />

                
                </div>
                <button
                  className="details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(property.id);
                  }}
                >
                  View Details
                </button>

                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

//   return (
//   <div>
//     <h1>Test Render</h1>
//     <p>Length: {properties.length}</p>
//     {properties.map((p) => (
//       <div key={p.id}>
//         <h2>{p.title}</h2>
//         <p>{p.city}</p>
//       </div>
//     ))}
//   </div>
// );
}