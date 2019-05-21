var recordCount = 0;

//initialize firebase
var config = {
    apiKey: "AIzaSyAvqkxu4TzQKs5wYQyNSYbwWdZNKXa3m48",
    authDomain: "train-tracker-51109.firebaseapp.com",
    databaseURL: "https://train-tracker-51109.firebaseio.com",
    projectId: "train-tracker-51109",
    storageBucket: "train-tracker-51109.appspot.com",
    messagingSenderId: "696583772050"
  };
  firebase.initializeApp(config);
//var to ref database
var database = firebase.database();

/*var name = "";
var role = "";
var startDate = "";
var monthRate= 0;*/

//button click to add train
$("#add-train").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    recordCount = 0;

    //push data to firebase
    database.ref().push( {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });

alert("Train successfully added");

$("#train-name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

return false

});

database.ref().on("child_added", function (doucment)
{
    recordCount += 1;

    console.log(document.key);
    console.log(document.val());

    var name = document.val().name;
    var destination = document.val().destination;
    var frequency = document.val().frequency;
    var firstTrain = document.val().firstTrain;
    var arrivalMinutes;
    var arrivalTime;

    var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");

    var minuteDifference = moment().diff(moment(trainTime), "minutes");
    var remainder = minuteDifference % frequency;
    arrivalMinutes = frequency - remainder;

    var nextTrain = moment().add(arrivalMinutes, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");

    var anchor = "<a href=# onclick=deleteDocument('" + document.key + "');>X</a>";

    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(arrivalMinutes),
            $("<td>").text(anchor),
        )
    );

    console.log("Record:" + recordCount);
});

function deleteDocumen(documentId) {
    database.ref().child(documentId).set(null);
    alert("Train successfully deleted");
    location.reload();
}