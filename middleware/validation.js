const { body, validationResult } = require("express-validator");

const validatePerson = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("gender")
        .notEmpty()
        .withMessage("Gender is required"),

    body("birthYear")
        .notEmpty()
        .withMessage("Birth Year is required"),

    body("homeworld")
        .notEmpty()
        .withMessage("Homeworld is required"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = {
    validatePerson
};