const Vehicle = require("../models/Vehicle");

// Create Vehicle
exports.createVehicle = async (req, res) => {
    try {

        const { name, model, manufacturer, cost, crew, passengers } = req.body;

        if (!name || !model || !manufacturer || !cost || !crew || !passengers) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const vehicle = await Vehicle.create({
            name,
            model,
            manufacturer,
            cost,
            crew,
            passengers,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: vehicle
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get All Vehicles
exports.getAllVehicles = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        let filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        const total = await Vehicle.countDocuments(filter);

        const vehicles = await Vehicle.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: vehicles
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get Vehicle By ID
exports.getVehicleById = async (req, res) => {
    try {

        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            data: vehicle
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Vehicle ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Update Vehicle
exports.updateVehicle = async (req, res) => {
    try {

        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: vehicle
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Vehicle ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Delete Vehicle
exports.deleteVehicle = async (req, res) => {
    try {

        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Vehicle ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};