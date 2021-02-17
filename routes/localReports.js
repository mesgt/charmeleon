var db = require("../models");


module.exports = function(app) {
    // GET route for displaying local crimes as reported by CrimaAde users.
    app.post("/api/userReport", function(req, res) {
        db.Report.create({
            category: req.body.category, //drop down input??
            date: req.body.date,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            description: req.body.description
                // attachments: lookup imgur npm
        }).then(function(dbpost) {
            res.json(dbpost);
        })
    });

    // GET routes for user reported data
    app.get("/api/userReport", function(req, res) {
        db.Report.findAll({}).then(function(dbPost) {
            console.log(Report);
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