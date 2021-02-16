var path = require("path");
const axios = require("axios")
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

module.exports = function (app) {

  app.get("/", function (req, res) {
    const model = {
      google_api_key: process.env.API_KEY_GOOGLE
    }
    res.render("index", model);
  });

  app.get("/api/:offense/:state", function (req, res) {
    
    let state = req.params.state;
    let offense = req.params.offense;

    let stateAbb = statesObj[state][0];
    let stateNum = statesObj[state][1];

    (async () => {
      try {
        const[crimeResponse, popResponse] = await axios.all([
          axios.get('https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/' + offense + '/offense/states/' + stateAbb + '/COUNT?API_KEY=' + process.env.API_KEY_FBI),
          axios.get('https://api.census.gov/data/2019/pep/population?get=DATE_CODE,DATE_DESC,POP,NAME,STATE&for=state:' + stateNum + '&key=' + process.env.API_KEY_CENSUS)
        ]);

        const crimeResArr = crimeResponse.data.results;

        let showGraph;
        let offenseCount2019;
        let offenseCount2018;
        let offenseCount2017;
        let offenseCount2016;
        let crimeRate2019;
        let crimeRate2018;
        let crimeRate2017;
        let crimeRate2016;
        
        if (crimeResArr.length != 0) {
          showGraph = crimeResArr.length > 3 ? true : false;
          offenseCount2019 = crimeResArr[crimeResArr.length-1].offense_count;
          
          const population = [];
          const popData = popResponse.data;
          for (let i = popData.length -1; i > 8; i--) {
            population.push(popData[i][2]);
          }

          if (showGraph) {
            offenseCount2018 = crimeResArr[crimeResArr.length-2].offense_count;
            offenseCount2017 = crimeResArr[crimeResArr.length-3].offense_count;
            offenseCount2016 = crimeResArr[crimeResArr.length-4].offense_count;
            crimeRate2018 = (offenseCount2018 / population[1]) * 100000;
            crimeRate2017 = (offenseCount2017 / population[2]) * 100000;
            crimeRate2016 = (offenseCount2016 / population[3]) * 100000;
          }

          crimeRate2019 = (offenseCount2019 / population[0]) * 100000;
  
          const dataObj = {
            state,
            crimeRate2019,
            crimeRate2018,
            crimeRate2017,
            crimeRate2016
          }

          res.json(dataObj);
          
        } else {
          const objNoData = {
            state,
            crimeRate2019: "No data to display",
            crimeRate2018,
            crimeRate2017,
            crimeRate2016
          }

          res.json(objNoData);
        }

      } catch(error) {
        console.log(error);
      }

    })();
  })
  

  // cms route loads cms.html
//   app.get("/??", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/???.html"));
//   });

//   // blog route loads blog.html
//   app.get("/??", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/???.html"));
//   });

//   // authors route loads author-manager.html
//   app.get("/??", function (req, res) {
//     res.sendFile(path.join(__dirname, "../public/???.html"));
//   });

};
