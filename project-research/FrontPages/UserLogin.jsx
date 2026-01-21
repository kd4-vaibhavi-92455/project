import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../src/context/AuthContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userData = { ...user, role: 'customer' };
      login(userData);
      navigate('/customer/dashboard');
      setError("");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />

      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">USER LOGIN</span>
      </div>

      {/* CENTER LOGIN */}
      <div className="container d-flex justify-content-center">
        <div className="card p-4 shadow login-card">
          <h4 className="text-warning mb-3">User Login</h4>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="User Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button className="btn btn-info w-100 text-white">
              LOGIN
            </button>

            <p className="mt-3">
              Not registered yet? <a href="/register">Click Here</a>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserLogin;
