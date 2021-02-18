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
        console.log(event);
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
        //  run the reportCrime function
        reportCrime(userData.category, userData.date, userData.streetAddress, userData.city, userData.state, userData.zip, userData.description);
        categoryInput.val("");
        dateInput.val("");
        streetInput.val("");
        cityInput.val("");
        stateInput.val("");
        zipInput.val("");
        descriptionInput.val("");

    });

    // Does a post to the report route.
    function reportCrime(category, date, streetAddress, city, state, zip, description) {
        $.post("/api/reports", {
                category: category,
                date: date,
                streetAddress: streetAddress,
                city: city,
                state: state,
                zip: zip,
                description: description,
            }).then(function(data) {
                console.log(data);
            })
            // .catch(handleErr);
            // If there's an error, handle it
    }

    // function handleErr(err) {
    //     $("#alert .msg").text(err.responseJSON);
    //     $("#alert").fadeIn(500);
    // }
});