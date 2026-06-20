import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Admin() {
  const [eventData, setEventData] =
    useState({
      eventName: "",
      description: "",
      department: "",
      venue: "",
      date: "",
      maxParticipants: "",
      category: "",
    });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]:
        e.target.value,
    });
  };

  const createEvent =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/events",
          eventData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Event Created Successfully"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <Layout>
      <div
        className="events-page"
      >
        <h1>
          Create Event
        </h1>

        <input
          className="search-box"
          name="eventName"
          placeholder="Event Name"
          onChange={
            handleChange
          }
        />

        <input
          className="search-box"
          name="description"
          placeholder="Description"
          onChange={
            handleChange
          }
        />

        <input
          className="search-box"
          name="department"
          placeholder="Department"
          onChange={
            handleChange
          }
        />

        <input
          className="search-box"
          name="venue"
          placeholder="Venue"
          onChange={
            handleChange
          }
        />

        <input
          className="search-box"
          name="date"
          type="date"
          onChange={
            handleChange
          }
        />

        <input
          className="search-box"
          name="maxParticipants"
          placeholder="Max Participants"
          onChange={
            handleChange
          }
        />

        <input
          className="search-box"
          name="category"
          placeholder="Category"
          onChange={
            handleChange
          }
        />

        <button
          onClick={
            createEvent
          }
        >
          Create Event
        </button>
      </div>
    </Layout>
  );
}

export default Admin;