import React from "react";
import "../styles/BenefitsSection.css";

const benefitsData = [
  {
    id: "01",
    title: "Massive Listings Database",
    description:
      "Thousands of properties listed daily across top U.S. cities — buyers and renters find options instantly."
  },
  {
    id: "02",
    title: "Verified Property Details",
    description:
      "Photos, videos, specs, and neighborhood information are verified for accuracy and quality."
  },
  {
    id: "03",
    title: "Strong Buyer Engagement",
    description:
      "High active user traffic and engagement ensure your property gets noticed fast."
  }
];

const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      {/* <div className="container"> */}
        <div className="benefits-header">
          <p className="ben-small-title">BENEFITS OF GRANDVIEW</p>
          <h2 className="ben-main-title">Why choose Grandview Realty</h2>
        </div>

        <div className="benefits-list">
          {benefitsData.map((item) => (
            <div className="benefit-card" key={item.id}>
              <div className="benefit-id">{item.id}</div>
              <div className="benefit-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      {/* </div> */}
    </section>
  );
};

export default BenefitsSection;
