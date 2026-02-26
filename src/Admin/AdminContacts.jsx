import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../Admin/AdminContacts.css";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setContacts(data);
    }
  }

  return (
    <section style={{ padding: "40px" }}>
      <h2>Customer Messages</h2>

      {contacts.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        contacts.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
            }}
          >
            <h4>{item.name}</h4>
            <p><strong>Email:</strong> {item.email}</p>
            <p>{item.message}</p>
            <small>
              {new Date(item.created_at).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </section>
  );
}