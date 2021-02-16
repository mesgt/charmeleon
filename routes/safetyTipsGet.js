var db = require("../models");

module.exports = function(app) {
    app.get("/api/safetyNote", function(req, res) {
        db.safetyTips.findOne({
            where: {
                id: req.params.id
            } //setup RNG to grab a random tip? Look up findone
        }).then(function(dbpost) {
            res.json(dbpost)
        })
    })
}