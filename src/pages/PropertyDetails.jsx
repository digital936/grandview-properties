

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ScheduleTourModal from "../buttons/ScheduleTourModal";
import "../styles/PropertyDetails.css";
import ZillowButton from "../buttons/ZillowButton";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  async function fetchProperty() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching property:", error);
    } else {
      setProperty(data);
    }
  }

  if (!property) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="pd-page">

      {/* Property Image */}
      <div className="pd-gallery">
        <img src={property.imageUrl} alt={property.title} />
      </div>

      <div className="pd-container">

        {/* LEFT SIDE */}
        <div className="pd-left">

          {/* Header Row */}
          <div className="pd-header-row">
            <div>
              <h1 className="pd-title">{property.title}</h1>
              <p className="pd-address">
                {property.address}, {property.city}
              </p>
            </div>

            <div className="pd-price-box">
              <h2 className="pd-price">
                ${Number(property.price).toLocaleString()} / month
              </h2>

              {/* {property.zillow_url?.trim() !== "" && (
                <a
                  href={property.zillow_url}
                  target="_blank"
                  rel="noreferrer"
                  className="zillow-btn"
                >
                  View on Zillow
                </a>
              )} */}
            </div>
          </div>

          {/* Highlights */}
          <div className="pd-highlights">
            <div><strong>{property.beds}</strong> Beds</div>
            <div><strong>{property.baths}</strong> Baths</div>
            <div><strong>{property.sqft}</strong> Sq Ft</div>
            <div><strong>{property.city}</strong></div>
          </div>

          {/* Description */}
          <div className="pd-section">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          {/* Property Details */}
          <div className="pd-section">
            <h3>Property Details</h3>
            <div className="pd-details-grid">
              <div>Category</div>
              <div>{property.category}</div>

              <div>Address</div>
              <div>{property.address}</div>

              <div>City</div>
              <div>{property.city}</div>

              <div>Bedrooms</div>
              <div>{property.beds}</div>

              <div>Bathrooms</div>
              <div>{property.baths}</div>

              <div>Area</div>
              <div>{property.sqft} Sq Ft</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pd-right">

          {/* Contact Card with Reusable Schedule Button */}
          <div className="contact-card">
            <ScheduleTourModal propertyId={property.id} />
          </div>

          <ZillowButton zillowLink={property.zillow_url} className="zillow-btn" />

          {/* Map Section */}
          <div className="pd-section">
            <h3>Location</h3>
            <iframe
              title="map"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}