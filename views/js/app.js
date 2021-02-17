// var db = require("../models");
const { urlencoded } = require("express");

module.exports = function(app) {
    app.get("/index.handlebars", function(req, res) {
        res.render("Report", { qs: req.query });
    });
    app.post("/views/userdata.handlebars", urlencoded, function(req, res) {
        console.log(req.body);
        res.render("Report", { qs: req.query });
    });
}