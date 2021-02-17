const crimeSearchBtn = $("#crime-search-btn");
const crimeCategorySelect = $("#category");
const dynamicContainer = $("#dynamic-container");


$(document).ready(initMap)

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.742043, lng: 	-104.991531 },
    zoom: 8,
  });

  crimeSearchBtn.on("click", displayData);

  function displayData () {
    crime = crimeCategorySelect.val();
    dynamicContainer.empty();
    const userGuideText = $("<p>").text("Viewing local data for " + crime);
    dynamicContainer.append(userGuideText);

    $.ajax("/api/" + crime, {
      type: "GET",
    }).then(function(data) {
      console.log(data);
    })
  }

    // const latLng = new google.maps.LatLng(39.742043, -104.991531);
  // new google.maps.Marker({
  //   position: latLng,
  //   label: "A",
  //   map: map,
  // });

}