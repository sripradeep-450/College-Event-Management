import { useState } from "react";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    department: "",
    year: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Student Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="registerNumber"
          placeholder="Register Number"
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;