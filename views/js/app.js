const { urlencoded } = require("express");

module.exports = function(app){
    app.get("/index.handlebars", function(req,res){
        res.render("userdata", {qs:req.query});
    });
    app.post("/views/userdata.handlebars", urlencoded, function(req,res){
    console.log(req.body);
        res.render("userdata", {qs:req.query});
    });
}
