const Starship = require("../models/Starship");

// Create Starship
exports.createStarship = async (req, res) => {
    try {

        const { name, model, manufacturer, cost, crew, passengers } = req.body;

        if (!name || !model || !manufacturer || !cost || !crew || !passengers) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const starship = await Starship.create({
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
            message: "Starship created successfully",
            data: starship
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get All Starships
exports.getAllStarships = async (req, res) => {
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

        const total = await Starship.countDocuments(filter);

        const starships = await Starship.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: starships
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get Starship By ID
exports.getStarshipById = async (req, res) => {
    try {

        const starship = await Starship.findById(req.params.id);

        if (!starship) {
            return res.status(404).json({
                success: false,
                message: "Starship not found"
            });
        }

        res.status(200).json({
            success: true,
            data: starship
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Starship ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Update Starship
exports.updateStarship = async (req, res) => {
    try {

        const starship = await Starship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!starship) {
            return res.status(404).json({
                success: false,
                message: "Starship not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Starship updated successfully",
            data: starship
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Starship ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Delete Starship
exports.deleteStarship = async (req, res) => {
    try {

        const starship = await Starship.findByIdAndDelete(req.params.id);

        if (!starship) {
            return res.status(404).json({
                success: false,
                message: "Starship not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Starship deleted successfully"
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Starship ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};