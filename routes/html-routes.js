var path = require("path");

module.exports = function(app) {

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/???.html"));
  });

  // cms route loads cms.html
  app.get("/??", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/???.html"));
  });

  // blog route loads blog.html
  app.get("/??", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/???.html"));
  });

  // placeholder route that loads individual user post to display details. If we have time.
  app.get("/placeholder/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/???.html"));
  });

};
