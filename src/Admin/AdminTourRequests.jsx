


import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminTourRequests.css";

export default function AdminTourRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from("tour_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setRequests(data);
  }

  const approveRequest = async (id) => {
    await supabase
      .from("tour_requests")
      .update({ status: "approved" })
      .eq("id", id);

    fetchRequests();
  };

  // 🔹 Generate Public URL for license
  const getLicenseUrl = (path) => {
    if (!path) return null;

    const { data } = supabase
      .storage
      .from("licenses")   // 👈 your bucket name (change if different)
      .getPublicUrl(path);

    return data.publicUrl;
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <h2 className="admin-title">Tour Requests</h2>

        {requests.map((req) => {
          const licenseUrl = getLicenseUrl(req.license_path);

          return (
            <div key={req.id} className="request-card">

              <div className="request-header">
                <div className="request-name">{req.name}</div>

                <span
                  className={`status-badge ${
                    req.status === "approved"
                      ? "status-approved"
                      : "status-pending"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <div className="request-details">
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Date:</strong> {req.date}</p>
                <p><strong>Time:</strong> {req.time}</p>
              </div>

              {/* 🔹 Driving License Preview */}
              {licenseUrl && (
                <div className="license-preview">
                  <p><strong>Driving Licence:</strong></p>
                  <img
                    src={licenseUrl}
                    alt="Driving License"
                    className="license-image"
                  />
                </div>
              )}

              {req.status === "pending" && (
                <button
                  className="approve-btn"
                  onClick={() => approveRequest(req.id)}
                >
                  Approve Request
                </button>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}