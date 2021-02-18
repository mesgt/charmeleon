const { response } = require("express");

$(document).ready(function() {
    var reportForm = $("form.report");
    var categoryInput = $("select#sidebar-category");
    var dateInput = $("input#date-input");
    var streetInput = $("input#street-input");
    var cityInput = $("input#city-input");
    var stateInput = $("input#state-input");
    var zipInput = $("input#zip-input");
    var descriptionInput = $("input#description-input");

    reportForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            category: categoryInput.val(),
            date: dateInput.val().trim(),
            streetAddress: streetInput.val().trim(),
            city: cityInput.val().trim(),
            state: stateInput.val().trim(),
            zip: zipInput.val().trim(),
            description: descriptionInput.val().trim(),
        };

        if (!userData.category || !userData.date || !userData.streetAddress || !userData.city || !userData.state || !userData.zip || !userData.description) {
            return;
        }

        $.ajax("/api/userReport", {
            type: "POST",
            data: userData
        }).then(function(response) {
            res.json(response);
        })
    })
});