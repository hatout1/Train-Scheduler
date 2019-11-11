$(document).ready(function () {

    // web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAx4BFYN4z-4CXi3_c9dA-ifClk6WQvNyo",
        authDomain: "train-scheduler-2e4e8.firebaseapp.com",
        databaseURL: "https://train-scheduler-2e4e8.firebaseio.com",
        projectId: "train-scheduler-2e4e8",
        storageBucket: "train-scheduler-2e4e8.appspot.com",
        messagingSenderId: "368512686890",
        appId: "1:368512686890:web:f89a069701cfe8db085c53"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // const database as small name for easy use.
    const db = firebase.database()
    // const moment time function
    let currentTime = moment().format();

    // function that collect data on click submit btn and assign it to arrays
    $('.btn').on('click', function (event) {
        event.preventDefault();

        // transfer collected values to a object to push them after to arrays
        var trainName = $('#trainName').val().trim();
        var distination = $('#destination').val().trim();
        var firstTrain = moment($('#firstTrainTime').val().trim(), "HHmm").format("HH:mm");
        var frequency = $('#frequency').val().trim();

        var newTrain = {
            train: trainName,
            trainDistination: distination,
            trainFirstTrain: firstTrain,
            trainFrequency: frequency,
        }

        // function that creates and add data to firebase.
        db.ref().push(newTrain);

        // to clear input area after submition of entries
        $('#trainName').val('');
        $('#destination').val('');
        $('#firstTrainTime').val('');
        $('#frequency').val('');
    });


    //  function to bring back the data from firebase
    db.ref().on("child_added", function (snap) {
        var trainNameT = snap.val().train
        var destinationT = snap.val().trainDistination
        var firstTrainTimeT = snap.val().trainFirstTrain
        console.log(firstTrainTimeT)
        var frequencyT = snap.val().trainFrequency

        // function to avoid multi entries of data.
        $('.trainName').empty();
        $('.destination').empty();
        $('.firstTrainTime').empty();
        $('.frequency').empty();

        // converte first train time to minutes.
        let startTimeConverted = moment(firstTrainTimeT, "HH:mm");
        console.log(startTimeConverted)
        // the difference minutes between now and the first train
        console.log(moment())
        let timeDiff = moment().diff(startTimeConverted, "minutes");
        console.log(timeDiff)
        // to calculate the difference left
        let timeRemain = Math.abs(timeDiff % frequencyT);
        console.log(timeRemain)
        // minutes to next train
        let minToArrival = frequencyT - timeRemain;
        console.log(minToArrival)
        // next train time
        let nextTrain;
        console.log(moment(firstTrainTimeT, "minutes"))
        if (moment(firstTrainTimeT, "minutes") >= moment()) {

            nextTrain = (moment(firstTrainTimeT, "minutes").format("HH:mm"))
        } else {
            nextTrain = moment(currentTime).add((minToArrival), "minutes").format("hh:mm A");
        }

        // function to append the values to the webpage
        $("#trainScheduleTable > tbody").append("<tr><td>" + trainNameT + "</td><td>" + destinationT + "</td><td>" + frequencyT + "</td><td>" + nextTrain + "</td><td>" + minToArrival + "</td></tr>")

    });
});
