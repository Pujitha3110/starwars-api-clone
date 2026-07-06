const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createStarship,
    getAllStarships,
    getStarshipById,
    updateStarship,
    deleteStarship
} = require("../controllers/starshipController");

// Public Routes
router.get("/", getAllStarships);
router.get("/:id", getStarshipById);

// Protected Routes
router.post("/", authMiddleware, createStarship);
router.put("/:id", authMiddleware, updateStarship);
router.delete("/:id", authMiddleware, deleteStarship);

module.exports = router;