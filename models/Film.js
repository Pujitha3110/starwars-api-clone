const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        director: {
            type: String,
            required: true
        },
        producer: {
            type: String,
            required: true
        },
        releaseDate: {
            type: String,
            required: true
        },
        episodeId: {
            type: Number,
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

module.exports = mongoose.model("Film", filmSchema);