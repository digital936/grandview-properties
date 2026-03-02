import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="sidebar">
      <h2 className="logo">Grandview</h2>

      {role === "tenant" && (
        <>
          <Link to="/tenant">Dashboard</Link>
          <Link to="/tenant/bookings">My Bookings</Link>
          <Link to="/tenant/payments">Payments</Link>
          <Link to="/tenant/profile">Profile</Link>
        </>
      )}

      {role === "owner" && (
        <>
          <Link to="/owner">Dashboard</Link>
          <Link to="/owner/properties">My Properties</Link>
          {/* <Link to="/owner/add">Add Property</Link> */}
          <Link to="/owner/bookings">Tenant Requests</Link>
        </>
      )}
    </div>
  );
}