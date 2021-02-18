$(document).ready(function() {

  // API CALL\\
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)
  });
});
