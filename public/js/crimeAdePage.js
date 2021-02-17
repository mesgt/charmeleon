// $(document).ready(function() {

  // API CALL\\
  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  // }).then(function (response) {
  //   console.log(response)
  // });
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

crimeSearchBtn.on("click", function() {
  offense = crimeCategorySelect.val();
  offenseDisplay = $("#" + offense).text();
  userGuideContainer.empty();
  const userGuideText = $("<p>").text("Click on the map!");
  userGuideContainer.append(userGuideText);
})

const statesObj = { 
  'Alabama': ['AL', '01'],
  'Alaska': ['AK', '02'],
  'Arizona': ['AZ', '04'], 
  'Arkansas': ['AR', '05'],
  'California': ['CA', '06'],
  'Colorado': ['CO', '08'], 
  'Connecticut': ['CT', '09'],
  'Delaware': ['DE', '10'], 
  'District of Columbia': ['DC', '11'], 
  'Florida': ['FL', '12'],
  'Georgia': ['GA', '13'], 
  'Hawaii': ['HI', '15'], 
  'Idaho': ['ID', '16'], 
  'Illinois': ['IL', '17'],
  'Indiana': ['IN', '18'],
  'Iowa': ['IA', '19'],
  'Kansas': ['KS', '20'],
  'Kentucky': ['KY', '21'],
  'Louisiana': ['LA', '22'],
  'Maine': ['ME', '23'],
  'Maryland': ['MD', '24'],
  'Massachusetts': ['MA', '25'],
  'Michigan': ['MI', '26'],
  'Minnesota': ['MN', '27'],
  'Mississippi': ['MS', '28'],
  'Missouri': ['MO', '29'],
  'Montana': ['MT', '30'],
  'Nebraska': ['NE', '31'],
  'Nevada': ['NV', '32'],
  'New Hampshire': ['NH', '33'],
  'New Jersey': ['NJ', '34'],
  'New Mexico': ['NM', '35'],
  'New York': ['NY', '35'],
  'North Carolina': ['NC', '37'],
  'North Dakota': ['ND', '38'],
  'Ohio': ['OH', '39'],
  'Oklahoma': ['OK', '40'],
  'Oregon': ['OR', '41'],
  'Pennsylvania': ['PA', '42'],
  'Rhode Island': ['RI', '44'],
  'South Carolina': ['SC', '45'],
  'South Dakota': ['SD', '46'],
  'Tennessee': ['TN', '47'],
  'Texas': ['TX', '48'],
  'Utah': ['UT', '49'],
  'Vermont': ['VT', '50'],
  'Virginia': ['VA', '51'],
  'Washington': ['WA', '53'],
  'West Virginia': ['WV', '54'],
  'Wisconsin': ['WI', '55'],
  'Wyoming': ['WY', '56'],
};

// $(document).ready(initMap)

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