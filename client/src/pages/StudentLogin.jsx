import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import studentPhoto from "../assets/studentloginphoto.jpg";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.student.role !== "student") {
        alert("Please use Admin Portal");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "student",
        JSON.stringify(res.data.student)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-end items-center pr-24"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url(${studentPhoto})`,
      }}
    >
      <motion.form
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        onSubmit={handleLogin}
        className="w-[430px] rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 p-10 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Student Login
        </h2>

        <div className="relative mb-5">
          <FaEnvelope className="absolute left-4 top-4 text-gray-300" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-4 top-4 text-gray-300" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4 text-white"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        <button
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-6 text-center text-white">
          New Student?{" "}
          <Link
            to="/student-register"
            className="font-semibold text-blue-300 hover:text-blue-200"
          >
            Register Here
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default StudentLogin;