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
