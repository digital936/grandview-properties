import { useState } from "react";
import { supabase } from "../lib/supabase";
import "../buttons/ScheduleTour.css";

export default function ScheduleTourModal({ propertyId }) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    licenseFile: null,
  });

  const handleSubmit = async () => {
    if (!formData.licenseFile) {
      alert("Please upload driving license photo");
      return;
    }

    const fileName = `${Date.now()}_${formData.licenseFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("licenses")
      .upload(fileName, formData.licenseFile);

    if (uploadError) {
      alert("File upload failed");
      return;
    }

    const { error } = await supabase
      .from("tour_requests")
      .insert([
        {
          property_id: propertyId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          license_path: fileName,
          status: "pending",
        },
      ]);

    if (!error) {
      alert("Tour request submitted!");
      setShowForm(false);
    }
  };

  return (
    <>
      <button
        className="schedule-btn"
        //  onClick={() => setShowForm(true)}
        onClick={(e) => {
    e.stopPropagation();   // 🛑 Prevent parent click
    e.preventDefault();    // 🛑 Prevent Link navigation
    setShowForm(true);
  
      }}
      >
        Schedule Tour
      </button>

      {showForm && (
        <div className="tour-overlay">
          <div className="tour-box">
            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h2>Schedule a Tour</h2>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <input
              type="date"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <input
              type="time"
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />

            <h5>Upload Driving License Photo</h5>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  licenseFile: e.target.files[0],
                })
              }
            />

            <div className="form-buttons">
              <button
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit Request
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}