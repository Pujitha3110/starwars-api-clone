const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createFilm,
    getAllFilms,
    getFilmById,
    updateFilm,
    deleteFilm
} = require("../controllers/filmController");

// Public
router.get("/", getAllFilms);
router.get("/:id", getFilmById);

// Protected
router.post("/", authMiddleware, createFilm);
router.put("/:id", authMiddleware, updateFilm);
router.delete("/:id", authMiddleware, deleteFilm);

module.exports = router;