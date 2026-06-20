import { Link } from "react-router-dom";

function Navbar() {
  const student =
  JSON.parse(
    localStorage.getItem(
      "student"
    )
  );
  return (
    <nav className="navbar">

      <h2>CEMS</h2>

      <div className="nav-links">

        {student?.role ===
          "admin" && (
          <Link to="/admin">
            Admin
          </Link>
        )}
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/my-registrations">
          Registrations
        </Link>

        <Link to="/attendance">
          Attendance
        </Link>

        <Link to="/certificates">
          Certificates
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;