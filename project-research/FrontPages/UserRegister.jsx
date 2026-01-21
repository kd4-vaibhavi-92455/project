import React, { useState } from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Mobile
    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Re-enter password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (validate()) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      password: form.password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");

    // Redirect to Login page
    navigate("/login");
  }
};



  return (
    <>
      <TopBar />
      <Navbar />

      <div className="breadcrumb">
        <span>HOME</span> | <span className="active">USER REGISTRATION</span>
      </div>

      <div className="register-wrapper">
        <h3 className="register-title">User Registration</h3>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Mobile Number</label>
          <input
            type="text"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>Re-enter Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <div className="register-buttons">
            <button type="submit">SUBMIT</button>
            <button type="reset" onClick={() => setErrors({})}>
              CLEAR
            </button>
          </div>

          <p className="login-link">
            Already registered ? <a href="/login">Login Here</a>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default UserRegister;
