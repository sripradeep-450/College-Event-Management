import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import eventManagementPhoto from "../assets/eventmanagement.png";
function LandingPage() {
  const navigate = useNavigate();

  return (
  <div className="landing-page">

    <div className="landing-overlay">

      <div className="landing-content">

        <h1>
          College Event Management System
        </h1>

        <p>
          Manage college events, registrations,
          attendance tracking, and certificates
          through one centralized platform.
        </p>

        <div className="landing-buttons">

          <Link
            to="/student-login"
            className="landing-btn student-btn"
          >
            Student Portal
          </Link>

          <Link
            to="/admin-login"
            className="landing-btn admin-btn"
          >
            Admin Portal
          </Link>

        </div>

      </div>

    </div>

  </div>
);
}

export default LandingPage;