const db = require("../models");
const axios = require("axios").default;
const fs = require('fs');

module.exports = function(app) {

  app.get("/api/mapjson", function(req, res) {
    let rawData = fs.readFileSync('denver.json');
    let parsedData = JSON.parse(rawData);
    res.json(parsedData);
  }) 

  app.get("/api/crimedata/:offense/:state", function(req, res) {
    let offense = req.params.offense;
    let state = req.params.state;
    var options = {
        method: 'GET',
        url: 'https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/' + offense + '/offense/states/' + state + '/COUNT?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv',
    };
      
      axios.request(options).then(function (response) {
        const resArr = response.data.results;
        res.json(resArr);
      }).catch(function (error) {
          console.error(error);
      });
  })

  app.get("/api/popdata/:statenum", function(req, res) {
    let stateNum = req.params.statenum;
    var options = {
        method: 'GET',
        url: 'https://api.census.gov/data/2019/pep/population?get=DATE_CODE,DATE_DESC,POP,NAME,STATE&for=state:' + stateNum + '&key=9237557962a3129aa80b6d9ac9e85659c89136d9',
      };
      
      axios.request(options).then(function (response) {
        const dataCleanUp = [];
        const data = response.data;
        for (let i = data.length -1; i > 8; i--) {
            dataCleanUp.push(data[i][2]);
        }
        res.json(dataCleanUp);
      }).catch(function (error) {
          console.error(error);
      });
  })

};
