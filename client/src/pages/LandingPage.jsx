import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUserShield,
} from "react-icons/fa";

import eventManagementPhoto from "../assets/eventmanagement.png";

function LandingPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${eventManagementPhoto})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end px-8 lg:px-24">

        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 shadow-2xl"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            College Event
            <br />
            Management
            <br />
            System
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-8">
            Manage college events, registrations,
            attendance tracking and certificates
            through one centralized platform.
          </p>

          <div className="mt-10 space-y-5">

            <Link
              to="/student-login"
              className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              <FaGraduationCap />
              Student Portal
            </Link>

            <Link
              to="/admin-login"
              className="flex items-center justify-center gap-3 rounded-xl bg-red-600 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
            >
              <FaUserShield />
              Admin Portal
            </Link>

          </div>

        </motion.div>

      </div>
    </div>
  );
}

export default LandingPage;