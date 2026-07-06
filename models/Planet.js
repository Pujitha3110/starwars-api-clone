const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        climate: {
            type: String,
            required: true
        },
        terrain: {
            type: String,
            required: true
        },
        population: {
            type: String,
            required: true
        },
        diameter: {
            type: String,
            required: true
        },
        gravity: {
            type: String,
            required: true
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

module.exports = mongoose.model("Planet", planetSchema);