import { useState, useEffect, } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Attendance() {
  const [events, setEvents] =
    useState([]);
  const [selectedEvent,
  setSelectedEvent] =
  useState(null);

  const [eventId, setEventId] =
    useState("");
  const [selectedYear,
  setSelectedYear] =
  useState("All");

    const [attendanceData,
  setAttendanceData] =
  useState({});

  const [students,
    setStudents] =
    useState([]);
  useEffect(() => {

    fetchEvents();

  }, []);
  const [search,
  setSearch] =
  useState("");
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
    `/attendance/registered/${eventId}`,
    {
      params: {
        year: selectedYear,
      },
    }
  );

      setStudents(
        registrationsRes.data
      );
      const event =
  events.find(
    (event) =>
      event._id === eventId
  );

setSelectedEvent(
  event
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
  const filteredStudents =
  students.filter(
    (registration) => {

      const student =
        registration.studentId;

      return (

        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        student.registerNumber
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    }
  );

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
        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              e.target.value
            )
          }
          style={{
            marginLeft: "15px",
            padding: "8px",
          }}
        >

        <option value="All">
          All Years
        </option>

        <option value="1">
          1st Year
        </option>

        <option value="2">
          2nd Year
        </option>

        <option value="3">
          3rd Year
        </option>

        <option value="4">
          4th Year
        </option>

</select>
{
  selectedEvent && (

    <div
      className="attendance-summary-card"
    >

      <h3>
        Attendance Summary
      </h3>

      <p>
        <strong>
          Event:
        </strong>{" "}
        {
          selectedEvent.eventName
        }
      </p>

      <p>
        <strong>
          Year:
        </strong>{" "}
        {
          selectedYear === "All"
            ? "All Years"
            : `${selectedYear}${
                selectedYear === "1"
                  ? "st"
                  : selectedYear === "2"
                  ? "nd"
                  : selectedYear === "3"
                  ? "rd"
                  : "th"
              } Year`
        }
      </p>

      <p>
        <strong>
          Registered Students:
        </strong>{" "}
        {students.length}
      </p>

    </div>

  )
}
<input
  type="text"
  className="search-box"
  placeholder="Search by Name or Register Number"
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
/>
        <br />
        <br />

        {filteredStudents.map(
          (registration) => (

            <div
              key={
                registration._id
              }
              className="event-card"
            >

              <h3>
                {registration.studentId?.name}
              </h3>

              <p>
                <strong>
                  Register No:
                </strong>{" "}
                {registration.studentId?.registerNumber}
              </p>

              <p>
                <strong>
                  Department:
                </strong>{" "}
                {registration.studentId?.department}
              </p>

              <p>
                <strong>
                  Year:
                </strong>{" "}
                {registration.studentId?.year}
                {
                  registration.studentId?.year === 1
                    ? "st"
                    : registration.studentId?.year === 2
                    ? "nd"
                    : registration.studentId?.year === 3
                    ? "rd"
                    : "th"
                }{" "}
                Year
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {registration.studentId?.email}
              </p>

              <div
  className="attendance-options"
>

  <label
    className="present-option"
  >

    <input
      type="radio"
      name={
        registration.studentId._id
      }
      value="Present"
      checked={
        attendanceData[
          registration.studentId._id
        ] === "Present"
      }
      onChange={() =>
        handleAttendanceChange(
          registration.studentId._id,
          "Present"
        )
      }
    />

    Present

  </label>

  <label
    className="absent-option"
  >

    <input
      type="radio"
      name={
        registration.studentId._id
      }
      value="Absent"
      checked={
        attendanceData[
          registration.studentId._id
        ] === "Absent"
      }
      onChange={() =>
        handleAttendanceChange(
          registration.studentId._id,
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