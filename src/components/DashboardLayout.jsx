import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

export default function DashboardLayout({ role, children }) {
  return (
    <div className="dashboard">
      <Sidebar role={role} />
      <div className="dashboard-main">
        {children}
      </div>
    </div>
  );
}