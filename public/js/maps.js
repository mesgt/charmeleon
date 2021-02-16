

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 4,
    });

    map.data.loadGeoJson(
        "https://storage.googleapis.com/mapsdevsite/json/states.js",
        { idPropertyName: "STATE" }
    );

    //customize your map?
    map.data.setStyle(function (feature) {
        var color = 'gray';
        if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
        }
        return ({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
        });
    });

    map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, { strokeWeight: 3, fillColor: "purple" });
    });

    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();
    });

    map.data.addListener('click', handleClick)
};

function handleClick(event) {
    state_inp.value = event.feature.getProperty('NAME');
    map_form.submit();

    // let stateAbb = statesObj[state][0];
    // let stateNum = statesObj[state][1];

    // $.ajax("/api/crimedata/" + offense + "/" + stateAbb, {
    //     type: "GET"
    // }).then(
    //     function (response) {
    //         if (response.length != 0) {
    //             let showGraph = response.length > 3 ? true : false;
    //             let offenseCount2019 = response[response.length - 1].offense_count;
    //             let offenseCount2018;
    //             let offenseCount2017;
    //             let offenseCount2016;

    //             if (showGraph) {
    //                 offenseCount2018 = response[response.length - 2].offense_count;
    //                 offenseCount2017 = response[response.length - 3].offense_count;
    //                 offenseCount2016 = response[response.length - 4].offense_count;
    //             }

    //             $.ajax("/api/popdata/" + stateNum, {
    //                 type: "GET"
    //             }).then(
    //                 function (response) {
    //                     const population = response;
    //                     let crimeRate2019 = (offenseCount2019 / population[0]) * 100000;
    //                     const stateDataObj = { state, crimeRate2019 }
    //                     console.log(stateDataObj);

    //                     stateDisplay.text(state);;
    //                     crimeDisplay.text(offenseDisplay);
    //                     rateDisplay.text(crimeRate2019.toFixed(2));
    //                     peopleNum.text("per 100,000 people");

    //                     if (crimeRate2019 > 500) {
    //                         rateColor.css("background-color", "red");
    //                     } else if (crimeRate2019 > 200) {
    //                         rateColor.css("background-color", "orange");
    //                     } else if (crimeRate2019 > 100) {
    //                         rateColor.css("background-color", "yellow");
    //                     } else {
    //                         rateColor.css("background-color", "#5fe25f");
    //                     }

    //                     if (showGraph) {
    //                         let crimeRate2018 = (offenseCount2018 / population[1]) * 100000;
    //                         let crimeRate2017 = (offenseCount2017 / population[2]) * 100000;
    //                         let crimeRate2016 = (offenseCount2016 / population[3]) * 100000;

    //                         loadChart(crimeRate2019, crimeRate2018, crimeRate2017, crimeRate2016, state, offenseDisplay);

    //                     } else {
    //                         chartContText.text("Not enough data to show trend");
    //                     }

    //                 })
    //         } else {
    //             crimeDisplay.text("No Data");
    //         }
    //     })
}