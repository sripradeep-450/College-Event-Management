import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import adminPhoto from "../assets/adminphoto.png";
function AdminLogin() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        if (
          res.data.student.role !==
          "admin"
        ) {
          alert(
            "Please use Student Portal"
          );
          return;
        }

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "student",
          JSON.stringify(
            res.data.student
          )
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
  <div className="admin-login-page">

    <div className="admin-login-left">

      <img
        src={adminPhoto}
        alt="Admin Portal"
      />

      <h1>
        Administrator Portal
      </h1>

      <p>
        Manage events,
        attendance,
        certificates,
        registrations
        and users.
      </p>

    </div>

    <div className="admin-login-right">

      <form
        className="admin-login-card"
        onSubmit={handleLogin}
      >

        <h2>
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <div className="password-box">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
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

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  </div>
);
}

export default AdminLogin;