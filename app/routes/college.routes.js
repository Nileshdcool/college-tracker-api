module.exports = app => {
    const colleges = require("../controllers/college.controller");

    var router = require("express").Router();

    // Seed a new colleges
    router.post("/seedCollege", colleges.seedCollege);

    // Create a new colleges
    router.post("/", colleges.create);

    // Retrieve all colleges
    router.get("/", colleges.findAll);

    // Retrieve all published colleges
    router.get("/published", colleges.findAllPublished);

    // Retrieve a single colleges with id
    router.get("/:id", colleges.findOne);

    // Update a colleges with id
    router.put("/:id", colleges.update);

    // Delete a colleges with id
    router.delete("/:id", colleges.delete);

    // Create a new colleges
    router.delete("/", colleges.deleteAll);

    app.use('/api/colleges', router);
};