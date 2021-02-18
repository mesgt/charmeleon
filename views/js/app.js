const db = require("../models");
// const { urlencoded } = require("express");

// module.exports = function(app) {
//     app.get("/index.handlebars", function(req, res) {
//         res.render("Report", { qs: req.query });
//     });
//     app.post("/views/userdata.handlebars", urlencoded, function(req, res) {
//         console.log(req.body);
//         res.render("Report", { qs: req.query });
//     });
// }

applyTable();

function applyTable() {
    // CLEAR TABLE EACH TIME LOOP RUNS \\
    $("#userList").empty();
    //MAKING HEADERS
    let headerRow = $("<tr>");
    let crimeDate = $("<th>");
    crimeDate.text("Dates:");
    let crimeCategory = $("<th>");
    crimeCategory.text("Crime Category:");
    headerRow.append(crimeDate, crimeCategory);
    $("#userList").append(headerRow);

    // LOOP TO BUILD USER INPUT TABLE \\
    for (let i = 0; i < db.reports.length; i++) {
        let newRow = $("<tr>");
        let newInput = $("<td>");
        newInput.attr("data-number", i);
        newInput.text(userInput[i]);
        let newCrime = $("<td>");
        newCrime.attr("data-number", i);
        newCrime.text(reports[i]);
        newRow.append(newInput, newCrime);
        $("#userList").append(newRow);
    };

}