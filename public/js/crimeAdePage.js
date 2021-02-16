// $(document).ready(function() {


  let API_key_dataGov = "0zzPFBL4Q7gydQEefEBf31p5nXt9DE0twgzF3CW2";

  let queryFoodURL = `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=1&api_key=${API_key_dataGov}`;

  // API CALL\\
  $.ajax({
    url: queryFoodURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)
  });
// });


// ************* GOOGLE MAP AND DATA *********************************
const crimeCategorySelect = $("#category");
const userGuideContainer = $("#user-guide-container");
const chartCont = $("#chartContainer");
const stateDisplay = $("#state");
const crimeDisplay = $("#crime");
const rateDisplay = $("#rate");
const peopleNum = $("#people");
const rateColor = $(".rate-color");

let offense_display;
let offense;
let map;

let chartContText = $("<p>");
chartContText.text("Crime trend chart will be displayed here");
chartCont.append(chartContText);

$(document).ready(initMap)

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
  map.data.setStyle(function(feature) {
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
  
  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 3, fillColor: "purple"});
  });
  
  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });

  map.data.addListener('click', function(event) {
    offense = crimeCategorySelect.val();
    console.log(offense);
    offense_display = $("#" + offense).text();
    let state = event.feature.getProperty('NAME');

    $.ajax("/api/" + offense + "/" + state, {
      type: "GET",
    }).then(
      function({state, crimeRate2019, crimeRate2018, crimeRate2017, crimeRate2016}) {

        stateDisplay.text(state);
        crimeDisplay.text(offense_display);

        // case no data
        if (crimeRate2019 === "No data to display") {
          rateDisplay.text(crimeRate2019);
          chartCont.text("No Data");
          return;
        }

        rateDisplay.text(crimeRate2019.toFixed(2));
        peopleNum.text("per 100,000 people");

        if (crimeRate2019 > 500) {
          rateColor.css("background-color", "red");
        } else if (crimeRate2019 > 200) {
          rateColor.css("background-color", "orange");
        } else if (crimeRate2019 > 100) {
          rateColor.css("background-color", "yellow");
        } else {
          rateColor.css("background-color", "#5fe25f");
        }

        // graph display
        if (!crimeRate2018) {
          chartCont.text("Not enough data to show trend");
          return;
        }

        loadChart(crimeRate2019, crimeRate2018, crimeRate2017, crimeRate2016, state, offense_display);
      }
    )
  })
}

// chart from canvas.js
function loadChart(crimeRate2019, crimeRate2018, crimeRate2017, crimeRate2016, state, offenseDisplay) {

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: `${state} ${offenseDisplay} rate per 100,000 people`,
      fontSize: 14
    },
    data: [{        
      type: "line",
          indexLabelFontSize: 16,
      dataPoints: [
        { y: crimeRate2016, indexLabel: "2016" },
        { y: crimeRate2017, indexLabel: "2017" },
        { y: crimeRate2018, indexLabel: "2018" },
        { y: crimeRate2019, indexLabel: "2019" },
      ]
    }]
  });
  chart.render();
  
}