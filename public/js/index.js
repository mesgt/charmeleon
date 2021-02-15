$(document).ready(function() {

  // API CALL\\
  $.ajax({
    url: queryFoodURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)
  });
});
