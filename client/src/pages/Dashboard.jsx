import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEvents: 0,
    totalRegistrations: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>

      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>
            College Event Management
          </h1>

          <button onClick={logout}>
            Logout
          </button>
        </div>

        <div className="dashboard-cards">

          <div className="card">
            <h2>{stats.totalStudents}</h2>
            <p>Total Students</p>
          </div>

          <div className="card">
            <h2>{stats.totalEvents}</h2>
            <p>Total Events</p>
          </div>

          <div className="card">
            <h2>{stats.totalRegistrations}</h2>
            <p>Total Registrations</p>
          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;