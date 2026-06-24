import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");

    navigate("/");
  };

  return (
    <div className="sidebar">

      <div>

        <h2 className="sidebar-logo">
          CEMS
        </h2>

        <NavLink
        to="/dashboard"
        className={({isActive}) =>
            isActive
            ? "active-link"
            : ""
        }
        >
        Dashboard
        </NavLink>

        {
          student?.role === "student" && (
            <>
              <NavLink
                to="/events"
                className={({isActive}) =>
                  isActive
                    ? "active-link"
                    : ""
                }
              >
                Events
              </NavLink>

              <NavLink
                to="/my-registrations"
                className={({isActive}) =>
                  isActive
                    ? "active-link"
                    : ""
                }
              >
                My Registrations
              </NavLink>

              <NavLink
                to="/certificates"
                className={({isActive}) =>
                  isActive
                    ? "active-link"
                    : ""
                }
              >
                Certificates
              </NavLink>
            </>
          )
        }

        {
          student?.role === "admin" && (
            <>
              <NavLink
                to="/attendance"
                className={({isActive}) =>
                  isActive
                    ? "active-link"
                    : ""
                }
              >
                Attendance
              </NavLink>

              <NavLink
                to="/admin"
                className={({isActive}) =>
                  isActive
                    ? "active-link"
                    : ""
                }
              >
                Admin Panel
              </NavLink>
            </>
          )
        }

      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;