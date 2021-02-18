// var path = require("path");
var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    const model = {
      google_api_key: process.env.API_KEY_GOOGLE
    }
    res.render("index", model);
  });

  app.get("/localdata", function (req, res) {
    const model = {
      google_api_key: process.env.API_KEY_GOOGLE
    }
    res.render("local-data", model);
  });
  


  app.get("/userdata/:id", function(req, res) {
    console.log(req.params.id);
    db.Report.findAll({
      attributes: ['category', 'date', 'streetAddress', 'city', 'state', 'zip', 'description'],
      where: {
          id: req.params.id
      }
    }).then(function(dbPost) {
      let newData = JSON.parse(JSON.stringify(dbPost))
      
      res.render("userdata", newData[0]);
    });
      
    });

};
