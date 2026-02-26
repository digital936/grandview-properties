import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminFeedback.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    const { data, error } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching feedback:", error);
    } else {
      setFeedbacks(data);
    }

    setLoading(false);
  }

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading feedback...</h2>;
  }

  return (
    <section className="admin-feedback-page">
      <div className="admin-feedback-container">
        <h2>Customer Feedback</h2>

        {feedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="feedback-list">
            {feedbacks.map((item) => (
              <div key={item.id} className="feedback-card">
                <h3>{item.name}</h3>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Rating:</strong> {"⭐".repeat(item.rating)}</p>
                <p className="message">{item.message}</p>
                <small>
                  {new Date(item.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}