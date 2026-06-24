import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import studentPhoto from "../assets/studentloginphoto.jpg";
function StudentLogin() {
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
          "student"
        ) {
          alert(
            "Please use Admin Portal"
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
  <div className="student-login-page">

    <div className="student-login-overlay">

      <form
        className="student-login-card"
        onSubmit={handleLogin}
      >
        <h2>Student Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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

        <p className="register-text">
          New Student?

          <Link to="/student-register">
            Register Here
          </Link>
        </p>

      </form>

    </div>

  </div>
);
}

export default StudentLogin;