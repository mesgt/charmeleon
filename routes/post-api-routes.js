var db = require("../models");


module.exports = function(app) {
    // POST route for saving a new report
    app.post("/api/reports", function(req, res) { //make reports table later
        db.Report.create({
            category: req.body.category, //drop down input??
            location: req.body.location, //geo data??
            date: req.body.date, //also geo data??
            description: req.body.description
                // attachments: lookup imgur npm
        }).then(function(dbpost) {
            res.json(dbpost);
        })
    });
    //   app.get("/api/TABLENAME", function(req, res) {
    //     var query = {};
    //     if (req.query.crime_id) {
    //       query.CrimeId = req.query.crime_id;
    //     }

    //     db.Post.findAll({
    //       where: query,
    //       include: [db.??]
    //     }).then(function(??) {
    //       res.json(??);
    //     });
    //   });

    //   app.get("/api/TABLENAME/:id", function(req, res) {
    //     // Here we add an "include" property to our options in our findOne query
    //     // We set the value to an array of the models we want to include in a left outer join
    //     // In this case, just db.Author
    //     db.Post.findOne({
    //       where: {
    //         id: req.params.id
    //       },
    //       include: [db.??]
    //     }).then(function(??) {
    //       res.json(??);
    //     });
    //   });

    //   // DELETE route for deleting posts
    //   app.delete("/api/TABLENAME/:id", function(req, res) {
    //     db.??.destroy({
    //       where: {
    //         id: req.params.id
    //       }
    //     }).then(function(??) {
    //       res.json(??);
    //     });
    //   });


};