const Film = require("../models/Film");

// Create Film
exports.createFilm = async (req, res) => {
    try {

        const { title, director, producer, releaseDate, episodeId } = req.body;

        if (!title || !director || !producer || !releaseDate || !episodeId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const film = await Film.create({
            title,
            director,
            producer,
            releaseDate,
            episodeId,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Film created successfully",
            data: film
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get All Films
exports.getAllFilms = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        let filter = {};

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        const total = await Film.countDocuments(filter);

        const films = await Film.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: films
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Get Film By ID
exports.getFilmById = async (req, res) => {
    try {

        const film = await Film.findById(req.params.id);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        res.status(200).json({
            success: true,
            data: film
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Film ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Update Film
exports.updateFilm = async (req, res) => {
    try {

        const film = await Film.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Film updated successfully",
            data: film
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// Delete Film
exports.deleteFilm = async (req, res) => {
    try {

        const film = await Film.findByIdAndDelete(req.params.id);

        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Film not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Film deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};