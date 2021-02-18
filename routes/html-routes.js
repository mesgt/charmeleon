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
  
  // app.get("/userdata", function(req, res) {
  //   res.render("userdata");
  // })

  app.get("/userdata/:id", function(req, res) {
    db.Report.findOne({
      where: {
          id: req.params.id
      }
    }).then(function(dbPost) {
        res.render("userdata", dbPost);
    });
      
    });
  // cms route loads cms.html
//   app.get("/??", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/???.html"));
//   });

//   // blog route loads blog.html
//   app.get("/??", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/???.html"));
//   });

  // placeholder route that loads individual user post to display details. If we have time.
  // app.get("/placeholder/:id", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/???.html"));
  // });

};
