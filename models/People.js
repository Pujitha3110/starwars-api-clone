const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            trim: true
        },
        birthYear: {
            type: String,
            required: true
        },
        homeworld: {
            type: String,
            required: true
        },
        species: {
            type: String,
            default: "Human"
        },
        image: {
            type: String,
            default: ""
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("People", peopleSchema);