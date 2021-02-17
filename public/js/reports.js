$(document).ready(function() {
    var reportForm = $("form.report"); //still need to make in Handlebars
    var crimeInput = $("input#crime-input") //still need to make in Handlebars

    reportForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            description: crimeInput.val().trim(),

        };

        if (!userData.description) {
            return;
        }
        // If we have a description, run the reportCrime function
        reportCrime(userData.description);
        crimeInput.val("");

    });

    // Does a post to the report route.
    function reportCrime(category, date, streetAddress, city, state, zip, description) {
        $.post("/api/userReport", {
            category: category,
            date: date,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zip: zip,
            description: description,
        }).catch(handleErr);
        // If there's an error, handle it
    }

    function handleErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});