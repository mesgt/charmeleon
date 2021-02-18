const crimeSearchBtn = $("#crime-search-btn");
const crimeCategorySelect = $("#category");
const dynamicContainer = $("#dynamic-container");
let map;
let mapMarkers = [];

$(document).ready(initMap)

function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.742043, lng: 	-104.991531 },
    zoom: 11,
  });
  
  crimeSearchBtn.on("click", displayData);

  function displayData () {
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
          setTimeout(function(){ infowindow.close(); }, 2000);
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



    // const latLng = new google.maps.LatLng(39.742043, -104.991531);
  // new google.maps.Marker({
  //   position: latLng,
  //   label: "A",
  //   map: map,
  // });

}