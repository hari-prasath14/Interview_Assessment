import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {


  const [formData, setFormData] = useState({ email: "", password: "" });



  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();

 

  const decodeBase64 = (str) => decodeURIComponent(escape(atob(str)));

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "", general: "" });
  };
  const handleLogin = (e) => {
    const { email, password } = formData;
    let hasError = false;
    let newErrors = { email: "", password: "", general: "" };
    if (!email || !isValidEmail(email)) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (!password || !isValidPassword(password)) {
      newErrors.password =
        "Password must be 6+ characters with letters and numbers";
      hasError = true;
    }

    if (hasError) return setError(newErrors);

    const user = JSON.parse(localStorage.getItem("user"));
    if (
      user &&
      user.email === email &&
      decodeBase64(user.password) === password
    ) {
      navigate("/dashboard");
    } else {
      setError({ ...newErrors, general: "Invalid credentials" });
    }
  };

  return (
    <div className="parentDiv">
      
      <div className="box">
        
        <h2>Login</h2>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error.password && <p className="error">{error.password}</p>}
        {error.general && <p className="error">{error.general}</p>}
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/register">Signup</Link>
        </p>
        <hr /> <button className="loginbutton">Login with Facebook</button>
        <button className="loginbutton">Login with Google</button>
      </div>
    </div>
  );
};

export default Login;
