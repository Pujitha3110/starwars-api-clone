const express = require("express");

const app = express();
const peopleRoutes = require("./routes/peopleRoutes");

const authRoutes = require("./routes/authRoutes");
const planetRoutes = require("./routes/planetRoutes");
const filmRoutes = require("./routes/filmRoutes");
const starshipRoutes = require("./routes/starshipRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const speciesRoutes = require("./routes/speciesRoutes");
// Middleware
app.use(express.json());
app.use("/api/starships", starshipRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/species", speciesRoutes);
// Routes
app.use("/api/films", filmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/planets", planetRoutes);
// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Star Wars API Clone 🚀"
    });
});

module.exports = app;