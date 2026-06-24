import { useState, useEffect, } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Attendance() {
  const [events, setEvents] =
    useState([]);

  const [eventId, setEventId] =
    useState("");

    const [attendanceData,
  setAttendanceData] =
  useState({});

  const [students,
    setStudents] =
    useState([]);
  useEffect(() => {

    fetchEvents();

  }, []);
  const fetchEvents =
  async () => {

    try {

      const res =
        await API.get(
          "/events/attendance-events"
        );

      setEvents(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };
  const fetchStudents =
  async () => {

    try {

      const registrationsRes =
        await API.get(
          `/attendance/registered/${eventId}`
        );

      setStudents(
        registrationsRes.data
      );

      const attendanceRes =
        await API.get(
          `/attendance/event/${eventId}`
        );

      const map = {};

      attendanceRes.data.forEach(
        (item) => {

          map[
            item.studentId._id
          ] = item.status;

        }
      );

      setAttendanceData(
        map
      );

    } catch (error) {

      console.log(error);

    }

  };

  const saveAllAttendance =
  async () => {

    try {

      const promises =
        Object.entries(
          attendanceData
        ).map(
          async (
            [studentId,
             status]
          ) => {

            return API.post(
              "/attendance/mark",
              {
                studentId,
                eventId,
                status,
              }
            );

          }
        );

      await Promise.all(
        promises
      );

      alert(
        "Attendance Saved Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Save Attendance"
      );

    }

  };

    const handleAttendanceChange =
  (
    studentId,
    status
  ) => {

    setAttendanceData(
      (prev) => ({
        ...prev,
        [studentId]:
          status,
      })
    );

  };

  return (
    <Layout>

      <div className="events-page">

        <h1>
          Attendance Management
        </h1>

        <select
          value={eventId}
          onChange={(e) =>
            setEventId(
              e.target.value
            )
          }
        >

          <option value="">
            Select Event
          </option>

          {events.map(
            (event) => (

              <option
                key={event._id}
                value={event._id}
              >

                {event.eventName}

                {" - "}

                {
                  new Date(
                    event.date
                  ).toLocaleDateString()
                }

                {" - "}

                {
                  event.attendanceStatus ===
                  "Pending"
                    ? "Pending"
                    : "Correction Window"
                }

              </option>

            )
          )}

        </select>

        <button
          onClick={
            fetchStudents
          }
        >
          Load Students
        </button>

        <br />
        <br />

        {students.map(
          (registration) => (

            <div
              key={
                registration._id
              }
              className="event-card"
            >

              <h3>
                {
                  registration
                    .studentId
                    ?.name
                }
              </h3>

              <p>
                {
                  registration
                    .studentId
                    ?.email
                }
              </p>

              <div
                className="attendance-options"
              >

                <label>

                  <input
                    type="radio"
                    name={
                      registration
                        .studentId
                        ._id
                    }
                    value="Present"
                    checked={
                      attendanceData[
                        registration
                          .studentId
                          ._id
                      ] ===
                      "Present"
                    }
                    onChange={() =>
                      handleAttendanceChange(
                        registration
                          .studentId
                          ._id,
                        "Present"
                      )
                    }
                  />

                  Present

                </label>

                <label>

                  <input
                    type="radio"
                    name={
                      registration
                        .studentId
                        ._id
                    }
                    value="Absent"
                    checked={
                      attendanceData[
                        registration
                          .studentId
                          ._id
                      ] ===
                      "Absent"
                    }
                    onChange={() =>
                      handleAttendanceChange(
                        registration
                          .studentId
                          ._id,
                        "Absent"
                      )
                    }
                  />

                  Absent

                </label>

              </div>

            </div>

          )
        )}
        {
  students.length > 0 && (

    <div
      style={{
        marginTop:
          "30px",
      }}
    >

      <button
        onClick={
          saveAllAttendance
        }
        className=
          "save-attendance-btn"
      >
        Save Attendance
      </button>

    </div>

  )
}

      </div>

    </Layout>
  );
}

export default Attendance;