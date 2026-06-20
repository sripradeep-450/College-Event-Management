import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const registerEvent = async (
    eventId
  ) => {
    try {
      const student = JSON.parse(
        localStorage.getItem("student")
      );

      await API.post(
        "/registrations",
        {
          studentId: student._id,
          eventId,
        }
      );

      alert(
        "Event Registration Successful"
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.eventName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="events-page">
        <h1>All Events</h1>

      <input
        type="text"
        placeholder="Search Event"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />

      <div className="event-grid">
        {filteredEvents.map((event) => (
          <div
            className="event-card"
            key={event._id}
          >
            <h2>{event.eventName}</h2>

            <p>
              {event.description}
            </p>

            <p>
              Department:
              {event.department}
            </p>

            <p>
              Venue:
              {event.venue}
            </p>

            <p>
              Category:
              {event.category}
            </p>

            <button
              onClick={() =>
                registerEvent(event._id)
              }>
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}

export default Events;