import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      registerNumber: "",
      department: "",
      year: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        await API.post(
          "/auth/register",
          {
            name:
              formData.name,
            registerNumber:
              formData.registerNumber,
            department:
              formData.department,
            year:
              formData.year,
            email:
              formData.email,
            password:
              formData.password,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/student-login"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div
      className="register-page"
    >
      <div
        className="register-left"
      >
        <img
          src=""
          alt="Student Registration"
        />

        <h1>
          Join College Events
        </h1>

        <p>
          Participate in
          workshops,
          hackathons,
          seminars and earn
          certificates.
        </p>
      </div>

      <div
        className="register-right"
      >
        <form
          className="register-card"
          onSubmit={
            handleSubmit
          }
        >
          <h2>
            Student Register
          </h2>

          <input
            name="name"
            placeholder="Name"
            onChange={
              handleChange
            }
          />

          <input
            name="registerNumber"
            placeholder="Register Number"
            onChange={
              handleChange
            }
          />

          <input
            name="department"
            placeholder="Department"
            onChange={
              handleChange
            }
          />

          <input
            name="year"
            placeholder="Year"
            onChange={
              handleChange
            }
          />

          <input
            name="email"
            placeholder="Email"
            onChange={
              handleChange
            }
          />

          <div
            className="password-box"
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              👁
            </span>
          </div>

          <div
            className="password-box"
          >
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={
                handleChange
              }
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              👁
            </span>
          </div>

          <button
            type="submit"
          >
            Register
          </button>

          <p>
            Already have an
            account?

            <Link
              to="/student-login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;