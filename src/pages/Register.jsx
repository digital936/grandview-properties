import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // reuse same styling if you want

export default function Register() {
  const [role, setRole] = useState("tenant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create Auth User
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Insert into profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              email: email,
              role: role,
            },
          ]);

        if (profileError) {
          alert("Error saving user role");
          setLoading(false);
          return;
        }
      }

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error(err.message);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Register Account</h2>

        <div className="role-toggle">
          <button
            type="button"
            className={role === "tenant" ? "active" : ""}
            onClick={() => setRole("tenant")}
          >
            Tenant
          </button>

          <button
            type="button"
            className={role === "owner" ? "active" : ""}
            onClick={() => setRole("owner")}
          >
            Property Owner
          </button>
        </div>

        <form onSubmit={handleRegister} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="register-link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}