
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./TenantDashboard.css";

import { FaBed, FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function TenantDashboard() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTenantProperty();
  }, []);

  async function fetchTenantProperty() {
  setLoading(true);

  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    setLoading(false);
    return;
  }

  const { data, error } = await supabase
  .from("leases")
  .select("*, properties(*)")
  .eq("tenant_id", user.id)
  .maybeSingle();

  console.log("DATA:", data);
  console.log("ERROR:", error);




  if (!error && data) {
    setProperty({
      ...data.properties,
      lease_start: data.lease_start,
      lease_end: data.lease_end
    });
  } else {
    setProperty(null);
  }

  setLoading(false);
}

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!issueTitle || !issueDesc) return;

    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user || !property) return;

    const { error } = await supabase.from("issues").insert({
      property_id: property.id,
      tenant_id: user.id,
      title: issueTitle,
      description: issueDesc,
      status: "pending",
    });

    if (!error) {
      setMessage("Issue submitted successfully ✅");
      setIssueTitle("");
      setIssueDesc("");
      setShowForm(false);
    } else {
      setMessage("Something went wrong ❌");
    }
  }

  if (loading) return <div className="tenant-layout">Loading...</div>;

  if (!property)
    return (
      <div className="tenant-layout">
        <h2>No property assigned.</h2>
        <p>Contact admin to assign a property.</p>
      </div>
    );

    
  return (
  <div className="tenant-layout">
    <div className="tenant-content">
      <h1>Tenant Dashboard</h1>

      <div className="tenant-grid">
  <div className="tenant-card">
    <div className="tenant-image-wrapper">
      <img src={property.imageUrl} alt={property.title} />

      <span className="tenant-badge">YOUR HOME</span>

      <span className="tenant-price">
        ${Number(property.price).toLocaleString()}
      </span>
    </div>

    <div className="tenant-content">
      <h3>{property.title}</h3>
      <p className="tenant-location">{property.city}</p>

      <div className="tenant-info">
        <span><FaBed size={20} /> {property.beds}</span>
        <span><FaBath size={20} /> {property.baths}</span>
        <span><BiArea size={20} /> {property.sqft} sqft</span>
      </div>

      <div className="tenant-lease">
        <p><strong>Lease Start:</strong> {property.lease_start}</p>
        <p><strong>Lease End:</strong> {property.lease_end}</p>
      </div>

      <div className="tenant-report-section">
        <button
          className="tenant-report-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Report an Issue"}
        </button>

        {showForm && (
          <form className="tenant-report-form" onSubmit={handleSubmit}>
            {message && <div className="tenant-message">{message}</div>}

            <input
              type="text"
              placeholder="Issue Title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Describe the issue..."
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              required
            />

            <button type="submit" className="tenant-submit-btn">
              Submit Issue
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
</div>

      
    </div>
  </div>
);
}