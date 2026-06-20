import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Attendance() {
  const [eventId, setEventId] =
    useState("");

  const [attendance,
    setAttendance] = useState([]);

  const fetchAttendance =
    async () => {
      try {
        const res =
          await API.get(
            `/attendance/event/${eventId}`
          );

        setAttendance(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <div className="events-page">
        <h1>
          Attendance
        </h1>

      <input
        className="search-box"
        placeholder="Enter Event ID"
        value={eventId}
        onChange={(e) =>
          setEventId(
            e.target.value
          )
        }
      />

      <button
        onClick={
          fetchAttendance
        }
      >
        View Attendance
      </button>

      <br />
      <br />

      {attendance.map(
        (item) => (
          <div
            key={item._id}
            className="event-card"
          >
            <h3>
              {
                item.studentId
                  ?.name
              }
            </h3>

            <p>
              Status:
              {item.status}
            </p>
          </div>
        )
      )}
    </div>
    </Layout>
  );
}

export default Attendance;