const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        classification: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        averageHeight: {
            type: String,
            required: true
        },
        averageLifespan: {
            type: String,
            required: true
        },
        language: {
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

module.exports = mongoose.model("Species", speciesSchema);