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


let offenseDisplay;
let offense;
let map;

let chartContText = $("<p>");
chartContText.text("Crime trend chart will be displayed here");
chartCont.append(chartContText);

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
    offenseDisplay = $("#" + offense).text();
    userGuideContainer.empty();
    const userGuideText = $("<p>").text("Click on the map!");
    userGuideContainer.append(userGuideText);

    let state = event.feature.getProperty('NAME');
    let stateAbb = statesObj[state][0];
    let stateNum = statesObj[state][1];
      
    $.ajax("/api/crimedata/" + offense + "/" + stateAbb, {
      type: "GET"
    }).then(
      function(response) {
        if (response.length != 0) {
          let showGraph = response.length > 3 ? true : false;
          let offenseCount2019 = response[response.length-1].offense_count;
          let offenseCount2018;
          let offenseCount2017;
          let offenseCount2016;

          if (showGraph) {
            offenseCount2018 = response[response.length-2].offense_count;
            offenseCount2017 = response[response.length-3].offense_count;
            offenseCount2016 = response[response.length-4].offense_count;
          }
          
          $.ajax("/api/popdata/" + stateNum, {
            type: "GET"
          }).then(
            function(response) {
              const population = response;
              let crimeRate2019 = (offenseCount2019 / population[0]) * 100000;
              const stateDataObj = { state, crimeRate2019 }
              console.log(stateDataObj);
              
              stateDisplay.text(state);;
              crimeDisplay.text(offenseDisplay);
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

              if (showGraph) {
                let crimeRate2018 = (offenseCount2018 / population[1]) * 100000;
                let crimeRate2017 = (offenseCount2017 / population[2]) * 100000;
                let crimeRate2016 = (offenseCount2016 / population[3]) * 100000;

                loadChart(crimeRate2019, crimeRate2018, crimeRate2017, crimeRate2016, state, offenseDisplay);
                
              } else {
                chartContText.text("Not enough data to show trend");
              }
             
            })
        } else {
          crimeDisplay.text("No Data");
        }
      })
  })
};

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