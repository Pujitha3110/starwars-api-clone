const express = require("express");

const app = express();
const peopleRoutes = require("./routes/peopleRoutes");

const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Star Wars API Clone 🚀"
    });
});

module.exports = app;