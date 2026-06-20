import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function MyRegistrations() {
  const [registrations,
    setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations =
    async () => {
      try {
        const student =
          JSON.parse(
            localStorage.getItem(
              "student"
            )
          );

        const res =
          await API.get(
            `/registrations/student/${student._id}`
          );

        setRegistrations(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <div
        style={{
          padding: "30px",
        }}
      >
        <h1>
        My Registrations
      </h1>

      {registrations.map(
        (registration) => (
          <div
            key={registration._id}
            className="event-card"
          >
            <h2>
              {
                registration
                  .eventId
                  .eventName
              }
            </h2>

            <p>
              Status:
              {
                registration.status
              }
            </p>
          </div>
        )
      )}
    </div>
    </Layout>
  );
}

export default MyRegistrations;