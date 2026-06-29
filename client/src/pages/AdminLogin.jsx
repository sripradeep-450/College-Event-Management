import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

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

<div className="flex min-h-screen">

  {/* LEFT IMAGE */}

  <div className="hidden lg:block w-1/2">

    <img
      src={adminPhoto}
      alt="Admin"
      className="w-full h-screen object-cover"
    />

  </div>

  {/* RIGHT LOGIN */}

  <div
    className="
      w-full
      lg:w-1/2
      flex
      justify-center
      items-center
      bg-gradient-to-br
      from-[#161637]
      via-[#2d1b69]
      to-[#4c1d95]
      p-10
    "
  >

    <motion.form

      initial={{opacity:0,x:80}}

      animate={{opacity:1,x:0}}

      transition={{duration:0.7}}

      onSubmit={handleLogin}

      className="
        w-[450px]
        rounded-3xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-2xl
        p-10
      "

    >

      <div className="flex justify-center">

        <div
          className="
          w-20
          h-20
          rounded-full
          bg-violet-500/20
          flex
          items-center
          justify-center
          "
        >

          <FaUserShield
            className="text-4xl text-violet-300"
          />

        </div>

      </div>

      <h1
        className="
        text-5xl
        font-bold
        text-white
        text-center
        mt-6
        "
      >
        Admin Portal
      </h1>

      <p
        className="
        text-center
        text-gray-300
        mt-3
        mb-8
        "
      >
        Secure Login for Event Administration
      </p>

      {/* EMAIL */}

      <div className="relative mb-5">

        <FaEnvelope
          className="
          absolute
          left-4
          top-4
          text-gray-300
          "
        />

        <input

          type="email"

          placeholder="Email Address"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          className="
          w-full
          rounded-xl
          bg-white/10
          border
          border-white/20
          pl-12
          pr-4
          py-3
          text-white
          placeholder-gray-300
          outline-none
          focus:ring-2
          focus:ring-violet-400
          "

        />

      </div>

      {/* PASSWORD */}

      <div className="relative">

        <FaLock
          className="
          absolute
          left-4
          top-4
          text-gray-300
          "
        />

        <input

          type={
            showPassword
            ? "text"
            : "password"
          }

          placeholder="Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="
          w-full
          rounded-xl
          bg-white/10
          border
          border-white/20
          pl-12
          pr-12
          py-3
          text-white
          placeholder-gray-300
          outline-none
          focus:ring-2
          focus:ring-violet-400
          "

        />

        <button

          type="button"

          onClick={()=>setShowPassword(!showPassword)}

          className="
          absolute
          right-4
          top-4
          text-white
          "

        >

          {
            showPassword
            ? <FaEyeSlash/>
            : <FaEye/>
          }

        </button>

      </div>

      <button

        className="
        mt-8
        w-full
        rounded-xl
        bg-gradient-to-r
        from-violet-600
        to-fuchsia-500
        py-3
        text-lg
        font-semibold
        text-white
        transition
        hover:scale-105
        "

      >

        Login

      </button>

      <p
        className="
        mt-8
        text-center
        text-gray-300
        text-sm
        "
      >

        College Event Management System

      </p>

    </motion.form>

  </div>

</div>

);
}

export default AdminLogin;