var db = require("../models");


module.exports = function(app) {
    // POST route for saving a new report
    app.post("/api/userReport", function(req, res) {
        db.Report.create({
            category: req.body.category, //drop down input??
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            date: req.body.date,
            description: req.body.description
                // attachments: lookup imgur npm
        }).then(function(dbpost) {
            res.json(dbpost);
        })
    });

    app.get("/api/userReport", function(req, res) {
        db.Report.findAll({}).then(function(dbPost) {
            res.json(dbPost);
        });

    });

    app.get("/api/userReport/:id", function(req, res) {
        db.Report.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/userReport/:id", function(req, res) {
        db.Report.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });


};