const People = require("../models/People");

exports.createPerson = async (req, res) => {
    try {

        const {
            name,
            gender,
            birthYear,
            homeworld,
            species,
            image
        } = req.body;
        const person = await People.create({
            name,
            gender,
            birthYear,
            homeworld,
            species,
            image,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Person created successfully",
            data: person
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

exports.getAllPeople = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const gender = req.query.gender;
        const species = req.query.species;

        let filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (gender) {
            filter.gender = gender;
        }

        if (species) {
            filter.species = species;
        }

        const total = await People.countDocuments(filter);

        const people = await People.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: people
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.getPersonById = async (req, res) => {
    try {

        const person = await People.findById(req.params.id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            data: person
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.getPersonById = async (req, res) => {
    try {

        const person = await People.findById(req.params.id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            data: person
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Person ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.updatePerson = async (req, res) => {
    try {

        const person = await People.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Person updated successfully",
            data: person
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Person ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};
exports.deletePerson = async (req, res) => {
    try {

        const person = await People.findByIdAndDelete(req.params.id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Person not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Person deleted successfully"
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Person ID"
            });
        }

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};