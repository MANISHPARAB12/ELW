
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Css/Login.css";
import { loginUser } from "../Services/AuthService";
import { getApiError } from "../Api/apiError";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      // Your backend must return a JWT in data.token.
      if (!data?.token) {
        setError("Login response did not contain an authentication token.");
        return;
      }

      // Save the token for authenticated API requests.
      localStorage.setItem("token", data.token);

      // Navigate back to the page the user wanted to access.
      const destination = location.state?.from || "/Home";

      navigate(destination, {
        replace: true,
      });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        {location.state?.message && (
          <p role="status">{location.state.message}</p>
        )}

        <div className="input-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="signup">
          <h3>
            Don't have an Account?{" "}
            <Link to="/Signup" className="text-blue-800">
              Sign Up
            </Link>
          </h3>
        </div>
      </form>
    </div>
  );
};
