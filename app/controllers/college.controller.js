const db = require("../models");
const College = db.college;

// Create and Save a new asset
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a college
    const college = new College({
        name: req.body.name,
        year_founded: +req.body.year_founded,
        location: req.body.location,
        ratings: req.body.ratings,
        courses: req.body.courses
    });

    // Save college in the database
    college
        .save(college)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the college."
            });
        });
};

// Retrieve all colleges from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    College.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving colleges."
            });
        });
};

// Find a single college with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    College.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found college with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: "Error retrieving college with id=" + id });
        });
};

// Update a college by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    College.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update College with id=${id}. Maybe College was not found!`
                });
            } else res.send({ message: "College was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating College with id=" + id
            });
        });
};

// Delete a college with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    College.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete College with id=${id}. Maybe College was not found!`
                });
            } else {
                res.send({
                    message: "College was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete College with id=" + id
            });
        });
};

// Delete all Colleges from the database.
exports.deleteAll = (req, res) => {
    College.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} College were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all colleges."
            });
        });
};

// Find all published colleges
exports.findAllPublished = (req, res) => {
    College.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving colleges."
            });
        });
};