const crimeSearchBtn = $("#crime-search-btn");
const crimeCategorySelect = $("#category");
const dynamicContainer = $("#dynamic-container");
// const db = require("../../routes/post-api-routes");
// const safetyTip = require("../../models/safetyTip")

let map;
let mapMarkers = [];

$(document).ready(function() {
  initMap();
});

$.ajax("/api/reports", {
    method: "GET"
}).then(function(response) {
    response = response.slice(0, 10);
    response.forEach(element => {
      let newRow = $("<tr>");
      let newInput = $("<td>");
      newInput.attr("data-number", element.id);
      newInput.text(`\xa0 ${element.date} \xa0`);

      let newCrime = $("<td>");
      newCrime.attr("data-number", element.id);
      newCrime.text(`\xa0 ${element.category} \xa0`);

      let button = $("<button>");
      button.addClass("report-btn");
      $(`button`).attr(`id`, element.id);
      button.attr("data-number", element.id);
      button.text(`\xa0 ${"?"} \xa0`)

      newRow.append(newInput, newCrime, button);
      $("#userList").append(newRow);
    })
        //     $("#safetyTipTitle").text(response.title);
        //     $("#safetyTipBody").text(response.body);
        // }).catch(err => (handleErr(err))
        // );

    // $(`#${id}`).on("click", function(event) {
    //     event.preventDefault();
    //     console.log(`#${id}`);
    //     window.location.href = "/userdata/:id";
    // })
})
  
  

//safety tips
function getSafetyTip() {
    $.ajax("/api/safetyNote/", {
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#safetyTipTitle").text(response.title);
        $("#safetyTipBody").text(response.body);
    }).catch(err => (handleErr(err)));
};

function handleErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
};

// google map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.742043, lng: -104.991531 },
        zoom: 11,
    });

    crimeSearchBtn.on("click", displayData);

    function displayData() {
        crime = crimeCategorySelect.val();
        dynamicContainer.empty();
        const userGuideText = $("<p>").text("Viewing local data for " + crime + " from 1/1/2021 to 1/14/2021");
        dynamicContainer.append(userGuideText);

        $.ajax("/local/" + crime, {
            type: "GET",
        }).then(function(data) {
            if (mapMarkers.length != 0) {
                deleteMarkers();
            }

            for (let i = 0; i < data.length; i++) {
                let dataLat = parseFloat(data[i].geo_lat);
                let dataLon = parseFloat(data[i].geo_lon);
                let description = data[i].offense_type_id;

                const mapMarkerData = { lat: dataLat, lng: dataLon };
                const contentString = description;
                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                const marker = new google.maps.Marker({
                    position: mapMarkerData,
                    map: map,
                });
                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                })
                mapMarkers.push(marker);
            }

            setMapOnAll(map);
        })
    }

    function setMapOnAll(map) {
        for (let i = 0; i < mapMarkers.length; i++) {
            mapMarkers[i].setMap(map);
        }
    }

    function deleteMarkers() {
        setMapOnAll(null);
        mapMarkers = [];
    }
  }