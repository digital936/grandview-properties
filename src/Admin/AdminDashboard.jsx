import { Link } from "react-router-dom";
import "../Admin/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside>
        <h2>Grandview Admin</h2>
        <Link to="/admin/properties">Manage Properties</Link>
        <Link to="/admin/inquiries">View Inquiries</Link>
        <Link to="/admin/feedback">View Feedback</Link>
        <Link to="/admin/contacts">View ContactUs details</Link>
        <Link to="/admin/issues">View Tenant Issues</Link>
      </aside>

      <div className="admin-content">
        <h1>Welcome Admin</h1>
      </div>
    </div>
  );
}

