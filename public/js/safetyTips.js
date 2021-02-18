// // const safetyTip = require("../../models/safetyTip")

// $(document).ready(function () {
//     function getSafetyTip() {
//         $.ajax("/api/safetyNote/", {
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//             $("#safetyTipTitle").text(response.title);
//             $("#safetyTipBody").text(response.body);
//         }).catch(err => (handleErr(err))
//         );
//     }
//     function handleErr(err) {
//         $("#alert .msg").text(err.responseJSON);
//         $("#alert").fadeIn(500);
//     }

// getSafetyTip();

// })