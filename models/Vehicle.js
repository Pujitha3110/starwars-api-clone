const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        model: {
            type: String,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        },
        crew: {
            type: String,
            required: true
        },
        passengers: {
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

module.exports = mongoose.model("Vehicle", vehicleSchema);