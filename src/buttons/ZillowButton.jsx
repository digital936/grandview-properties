import React from "react";

const ZillowButton = ({ zillowLink, className = "" }) => {

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // If link is empty, null, or undefined
    if (!zillowLink) {
      alert("Zillow link not available for this property.");
      return;
    }

    // Open exactly what is stored in database
    window.open(zillowLink, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className={`nl-zillow-btn ${className}`}
      onClick={handleClick}
    >
      View on Zillow
    </button>
  );
};

export default ZillowButton;