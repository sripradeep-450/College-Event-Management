import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import registerPhoto from "../assets/studentloginphoto.jpg";
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
    className="min-h-screen bg-cover bg-center flex justify-end items-center pr-24"
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url(${registerPhoto})`,
    }}
  >
    <motion.form
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      onSubmit={handleSubmit}
      className="w-[500px] rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 p-10 shadow-2xl"
    >
      <h2 className="text-4xl font-bold text-white text-center mb-8">
        Student Registration
      </h2>

      <div className="grid gap-4">

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="registerNumber"
          placeholder="Register Number"
          onChange={handleChange}
          className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="year"
          onChange={handleChange}
          className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="text-black">Select Year</option>
          <option className="text-black" value="1">1st Year</option>
          <option className="text-black" value="2">2nd Year</option>
          <option className="text-black" value="3">3rd Year</option>
          <option className="text-black" value="4">4th Year</option>
        </select>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        <div className="relative">

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-4 text-white"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition"
      >
        Register
      </button>

      <p className="mt-6 text-center text-white">

        Already have an account?

        <Link
          to="/student-login"
          className="ml-2 font-semibold text-blue-300 hover:text-blue-200"
        >
          Login
        </Link>

      </p>

    </motion.form>
  </div>
);
}

export default StudentRegister;