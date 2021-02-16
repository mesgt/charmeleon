const db = require("../models");
const axios = require("axios").default;
const fs = require('fs');

module.exports = function(app) {

  app.get("/api/mapjson", function(req, res) {
    let rawData = fs.readFileSync('denver.json');
    let parsedData = JSON.parse(rawData);
    res.json(parsedData);
  }) 

};
