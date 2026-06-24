import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function MyRegistrations() {
  const [registrations,
  setRegistrations] =
  useState([]);

  const [attendanceMap,
  setAttendanceMap] =
  useState({});

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
        const attendanceRes =
          await API.get(
            `/attendance/student/${student._id}`
          );

        const map = {};

        attendanceRes.data.forEach(
          (item) => {

            map[
              item.eventId._id
            ] = item.status;

          }
        );

        setAttendanceMap(
          map
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
              Registration Status:
              {registration.status}
            </p>

            <p>
              Attendance:
              {
                attendanceMap[
                  registration.eventId._id
                ] || "Pending"
              }
            </p>

            <p>
              Event Date:
              {
                new Date(
                  registration
                    .eventId
                    .date
                ).toLocaleDateString()
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