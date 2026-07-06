const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createSpecies,
    getAllSpecies,
    getSpeciesById,
    updateSpecies,
    deleteSpecies
} = require("../controllers/speciesController");

// Public Routes
router.get("/", getAllSpecies);
router.get("/:id", getSpeciesById);

// Protected Routes
router.post("/", authMiddleware, createSpecies);
router.put("/:id", authMiddleware, updateSpecies);
router.delete("/:id", authMiddleware, deleteSpecies);

module.exports = router;