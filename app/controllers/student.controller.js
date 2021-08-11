const db = require("../models");
const Student = db.student;
const College = db.college;

exports.seedStudents = async (req, res) => {
    const SNKT = await College.findOne({ name: 'SNKT' });
    const tilak = await College.findOne({ name: 'Tilak College' });

    let nilesh = new Student({ name: 'Nilesh Sukalikar', year_of_batch: 2019, skills: ['C#', "Asp.net"], college: SNKT.id });
    let aditi = new Student({ name: 'Aditi Sukalikar', year_of_batch: 2012, skills: ['C#', ".net core"], college: tilak.id });

    await nilesh.save();
    await aditi.save();
    SNKT.students.push(nilesh);
    tilak.students.push(aditi);

    await SNKT.save();
    await tilak.save();

    const a = await Student.find();
    res.send(a);
}

// Create and Save a new students
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a college
    const student = new Student({
        name: req.body.name,
        year_of_batch: req.body.year_of_batch,
        skills: req.body.skills,
        collegeID: db.mongoose.Types.ObjectId(req.body.objectId),
    });
    // Save college in the database
    student
        .save(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the student."
            });
        });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Student.find(condition).populate('college')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};

// Find a single college with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found student with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({ message: "Error retrieving student with id=" + id });
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

    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update student with id=${id}. Maybe student was not found!`
                });
            } else res.send({ message: "student was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating student with id=" + id
            });
        });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete student with id=${id}. Maybe student was not found!`
                });
            } else {
                res.send({
                    message: "student was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete student with id=" + id
            });
        });
};

// Delete all students from the database.
exports.deleteAll = (req, res) => {
    Student.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} student were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all students."
            });
        });
};