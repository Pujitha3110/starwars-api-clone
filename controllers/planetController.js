const Planet = require("../models/Planet");

exports.createPlanet = async (req, res) => {
    try {

        const {
            name,
            climate,
            terrain,
            population,
            diameter,
            gravity
        } = req.body;

        if (!name || !climate || !terrain || !population || !diameter || !gravity) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const planet = await Planet.create({
            name,
            climate,
            terrain,
            population,
            diameter,
            gravity,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Planet created successfully",
            data: planet
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.getAllPlanets = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const climate = req.query.climate;
        const terrain = req.query.terrain;

        let filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (climate) {
            filter.climate = climate;
        }

        if (terrain) {
            filter.terrain = terrain;
        }

        const total = await Planet.countDocuments(filter);

        const planets = await Planet.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: planets
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.getPlanetById = async (req, res) => {
    try {

        const planet = await Planet.findById(req.params.id);

        if (!planet) {
            return res.status(404).json({
                success: false,
                message: "Planet not found"
            });
        }

        res.status(200).json({
            success: true,
            data: planet
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Planet ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.updatePlanet = async (req, res) => {
    try {

        const planet = await Planet.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!planet) {
            return res.status(404).json({
                success: false,
                message: "Planet not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Planet updated successfully",
            data: planet
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Planet ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.deletePlanet = async (req, res) => {
    try {

        const planet = await Planet.findByIdAndDelete(req.params.id);

        if (!planet) {
            return res.status(404).json({
                success: false,
                message: "Planet not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Planet deleted successfully"
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Planet ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};