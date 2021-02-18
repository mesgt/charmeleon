var path = require("path");

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
  
  app.get("/userdata", function(req, res) {
    res.render("userdata");
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
