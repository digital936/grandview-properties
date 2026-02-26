
import { Link } from "react-router-dom";

{/* PROMOTION SECTION BELOW SEARCH */}
const RentAHome = () => {
  return (
<section className="promotion-section">
      <div className="promotion-wrapper">
        <div className="promotion-grid">

          

          {/* Left CONTENT */}
          <div className="promotion-content">
            <p className="promotion-tag">Rent a Home</p>

            <h2 className="promotion-title">
              Rental Homes for Everyone
            </h2>

            <p className="promotion-description">
              Explore from apartments, builder floors, villas and more
            </p>

            <Link to="/rent">
              <button className="promotion-button">
                Explore Renting
              </button>
            </Link>

          </div>

          {/* right IMAGE */}
          <div className="promotion-image-card">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
              alt="Luxury Property"
            />
          </div>

        </div>
      </div>
      </section>
  );
};

export default RentAHome;

