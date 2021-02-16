var db = require("../models");

module.exports = function(app) {
    app.get("/api/safetyNote/:id", function(req, res) {
        // id = Math.floor(Math.random() * safetyNote.length)
        // id = 1
        db.Tips.findOne({
            where: {
                id: req.params.id
            } 
        }).then(function(dbpost) {
            res.json(dbpost)
        })
    })
}

//get all
//randomize
//select