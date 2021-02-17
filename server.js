require("dotenv").config()
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var db = require("./models");


var PORT = process.env.PORT || 8085;


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
require("./routes/safetyTipsGet.js")(app);
require("./routes/localReports.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
<<<<<<< HEAD
db.sequelize.sync().then(function() {
=======
db.sequelize.sync({}).then(function() {
>>>>>>> f55ed9497378c89e3c2af098054576790f33dd58
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
