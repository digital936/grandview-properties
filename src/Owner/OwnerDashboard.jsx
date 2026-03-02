import DashboardLayout from "../components/DashboardLayout";

export default function OwnerDashboard() {
  return (
    <DashboardLayout role="owner">
      <h1>Owner Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Total Properties</h3>
          <p>4</p>
        </div>

        <div className="card">
          <h3>Available Properties</h3>
          <p>2</p>
        </div>

        <div className="card">
          <h3>Rented Properties</h3>
          <p>2</p>
        </div>

        <div className="card">
          <h3>Monthly Revenue</h3>
          <p>$ 7,000</p>
        </div>
      </div>

      {/* <div className="section">
        <h2>Recent Booking Requests</h2>
        <ul>
          <li>2BHK in Baner - Pending Approval</li>
          <li>Studio Apartment - Approved</li>
        </ul>
      </div> */}
    </DashboardLayout>
  );
}