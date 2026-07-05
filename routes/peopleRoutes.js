const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { validatePerson } = require("../middleware/validation");
const {
    createPerson,
    getAllPeople,
    getPersonById,
    updatePerson,
    deletePerson
} = require("../controllers/peopleController");
const upload = require("../middleware/upload");
// Public Route
router.post("/", authMiddleware, validatePerson, createPerson);
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    validatePerson,
    createPerson
);

router.put("/:id", authMiddleware, validatePerson, updatePerson);
router.get("/", getAllPeople);
router.get("/:id", getPersonById);
router.put("/:id", authMiddleware, updatePerson);
router.delete("/:id", authMiddleware, deletePerson);
// Protected Route
router.post("/", authMiddleware, createPerson);

module.exports = router;