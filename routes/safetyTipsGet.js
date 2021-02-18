var db = require("../models");

module.exports = function(app) {
    app.get("/api/safetytips", function(req, res) {
        db.safetyTips.findAll().then(response => {
            id = Math.floor(Math.random() * response.length)
            res.json(response[id])
        })
    })
    app.post("/api/safetytips", function(req, res) {
        db.safetyTips.create(req.body).then(response => {
            res.json(response)
        })
    })
}