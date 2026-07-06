const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createPlanet,
    getAllPlanets,
    getPlanetById,
    updatePlanet,
    deletePlanet
} = require("../controllers/planetController");

// Public Routes
router.get("/", getAllPlanets);
router.get("/:id", getPlanetById);

// Protected Routes
router.post("/", authMiddleware, createPlanet);
router.put("/:id", authMiddleware, updatePlanet);
router.delete("/:id", authMiddleware, deletePlanet);

module.exports = router;