require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const testRoute = require("./routes/testRoute");
const registrationRoutes =
  require("./routes/registrationRoutes");
const dashboardRoutes =
  require("./routes/dashboardRoutes");
const attendanceRoutes =
  require("./routes/attendanceRoutes");
const adminRoutes =
  require("./routes/adminRoutes");
const certificateRoutes =
  require("./routes/certificateRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use(
  "/api/registrations",
  registrationRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/attendance",
  attendanceRoutes
);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/certificates",
  certificateRoutes
);
app.use("/api/test", testRoute);
app.get("/", (req, res) => {
  res.send("College Event Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});