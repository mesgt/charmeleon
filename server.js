var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var db = require("./models");


var PORT = process.env.PORT || 8080;

var PORT = process.env.PORT || 8085;


// Requiring our models for syncing
// var db = require("./models");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" })); 
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routes
// =============================================================

require("./routes/googleMap-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
// });
