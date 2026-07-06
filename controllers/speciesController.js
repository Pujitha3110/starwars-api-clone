const Species = require("../models/Species");

// Create Species
exports.createSpecies = async (req, res) => {
    try {

        const {
            name,
            classification,
            designation,
            averageHeight,
            averageLifespan,
            language
        } = req.body;

        if (
            !name ||
            !classification ||
            !designation ||
            !averageHeight ||
            !averageLifespan ||
            !language
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const species = await Species.create({
            name,
            classification,
            designation,
            averageHeight,
            averageLifespan,
            language,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Species created successfully",
            data: species
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get All Species
exports.getAllSpecies = async (req, res) => {
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

        const total = await Species.countDocuments(filter);

        const species = await Species.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: species
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get Species By ID
exports.getSpeciesById = async (req, res) => {
    try {

        const species = await Species.findById(req.params.id);

        if (!species) {
            return res.status(404).json({
                success: false,
                message: "Species not found"
            });
        }

        res.status(200).json({
            success: true,
            data: species
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Species ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Update Species
exports.updateSpecies = async (req, res) => {
    try {

        const species = await Species.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!species) {
            return res.status(404).json({
                success: false,
                message: "Species not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Species updated successfully",
            data: species
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Species ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Delete Species
exports.deleteSpecies = async (req, res) => {
    try {

        const species = await Species.findByIdAndDelete(req.params.id);

        if (!species) {
            return res.status(404).json({
                success: false,
                message: "Species not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Species deleted successfully"
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Species ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};