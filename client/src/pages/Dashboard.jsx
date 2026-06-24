import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    myRegistrations: 0,
    upcomingEvent: null,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
  async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem(
            "student"
          )
        );

      let res;

      if (
        user.role ===
        "student"
      ) {

        res =
          await API.get(
            `/dashboard?role=student&studentId=${user._id}`
          );

      } else {

        res =
          await API.get(
            "/dashboard?role=admin"
          );

      }

      setStats(
        res.data
      );

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

        </div>

        <div className="dashboard-cards">
          {
            JSON.parse(
              localStorage.getItem(
                "student"
              )
            ).role === "student" ? (

              <>
                <div className="card">
                  <h2>
                    {stats.totalEvents}
                  </h2>
                  <p>
                    Total Events
                  </p>
                </div>

                <div className="card">
                  <h2>
                    {
                      stats.myRegistrations
                    }
                  </h2>
                  <p>
                    My Registrations
                  </p>
                </div>

                <div className="card">
                  <h2>
                    Upcoming
                  </h2>

                  {stats.upcomingEvent ? (
                    <>
                      <p>
                        {
                          stats
                            .upcomingEvent
                            .eventName
                        }
                      </p>

                      <p>
                        {new Date(
                          stats
                            .upcomingEvent
                            .date
                        ).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <p>
                      No Upcoming Event
                    </p>
                  )}
                </div>
              </>

            ) : (

              <>
                <div className="card">
                  <h2>
                    {
                      stats.totalStudents
                    }
                  </h2>
                  <p>
                    Total Students
                  </p>
                </div>

                <div className="card">
                  <h2>
                    {
                      stats.participatedStudents
                    }
                  </h2>
                  <p>
                    Participated Students
                  </p>
                </div>

                <div className="card">
                  <h2>
                    {
                      stats.totalEvents
                    }
                  </h2>
                  <p>
                    Total Events
                  </p>
                </div>

                <div className="card">
                  <h2>
                    Upcoming
                  </h2>

                  {stats.upcomingEvent ? (
                    <>
                      <p>
                        {
                          stats
                            .upcomingEvent
                            .eventName
                        }
                      </p>

                      <p>
                        {new Date(
                          stats
                            .upcomingEvent
                            .date
                        ).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <p>
                      No Upcoming Event
                    </p>
                  )}
                </div>
              </>

            )
          }
        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;