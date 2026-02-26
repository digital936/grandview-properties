

// const HeroSection = () => {
//   return (
//     <section className="hero">

//       {/* TOP HERO AREA */}
//       <div className="overlay">
//         <h1>Find Your Dream Home with Grandview Realty</h1>
//         <p>Premium properties. Trusted guidance. Exceptional service.</p>

//         <div className="search-box">
//           <input type="text" placeholder="Search city or locality" />
//           <select>
//             <option>Buy</option>
//             <option>Rent</option>
//           </select>
//           <select>
//             <option>Town Home</option>
//             <option>Single Family House</option>
//           </select>
//           <button>Search</button>
//         </div>
//       </div>

      

//     </section>

    
//   );
// };

// export default HeroSection;




import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [category, setCategory] = useState("buy");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    navigate(
      `/search?city=${city}&category=${category}&type=${propertyType}`
    );
  };

  return (
    <section className="hero">
      <div className="overlay">
        <h1>Find Your Dream Home with Grandview Realty</h1>
        <p>Premium properties. Trusted guidance. Exceptional service.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search city or locality"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            {/* <option value="">All Types</option> */}
            <option value="Town Home">Town Home</option>
            <option value="Single Family House">
              Single Family House
            </option>
            {/* <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option> */}
          </select>

          <button onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
