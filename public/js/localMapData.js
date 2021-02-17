const crimeSearchBtn = $("#crime-search-btn");
const crimeCategorySelect = $("#category");
const dynamicContainer = $("#dynamic-container");


$(document).ready(initMap)

crimeSearchBtn.on("click", function() {
  crime = crimeCategorySelect.val();
  console.log(crime);
  dynamicContainer.empty();
  const userGuideText = $("<p>").text("Viewing local data for " + crime);
  dynamicContainer.append(userGuideText);
})

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.742043, lng: 	-104.991531 },
    zoom: 8,
  });

    // const latLng = new google.maps.LatLng(39.742043, -104.991531);
  // new google.maps.Marker({
  //   position: latLng,
  //   label: "A",
  //   map: map,
  // });

}