import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const navigate = useNavigate();
  const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "", general: "" });
  };
  const handleRegister = (e) => {
    const { email, password, confirmPassword } = formData;

    let newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };
    let hasError = false;

    if (!email || !isValidEmail(email)) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (!password || !isValidPassword(password)) {
      newErrors.password =
        "Password must be 6+ characters with letters and numbers";
      hasError = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (hasError) return setError(newErrors);

    const encodedPassword = encodeBase64(password);
    localStorage.setItem(
      "user",
      JSON.stringify({ email, password: encodedPassword })
    );
    navigate("/");
  };

  return (
    <div className="parentDiv">
      <div className="box">
        <h2>Signup</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {error.email && <p className="error">{error.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
        />
        {error.password && <p className="error">{error.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {error.confirmPassword && (
          <p className="error">{error.confirmPassword}</p>
        )}
        {error.general && <p className="error">{error.general}</p>}
        <button onClick={handleRegister}>Signup</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
        <hr /> <button className="loginbutton">Login with Facebook</button>
        <button className="loginbutton">Login with Google</button>
      </div>
    </div>
  );
};

export default Register;
