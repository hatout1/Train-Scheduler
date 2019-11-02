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

    // arrays to hold admin entries
    let trainNameArray = [];
    let destinationArray = [];
    let firstTrainTimeArray = [];
    let frequencyArray = [];


    // function that collect data on click submit btn and assign it to arrays
    $('.btn').on('click', function (event) {
        event.preventDefault();

        // make value as a const to push them after to arrays
        const trainName = $('#trainName').val();
        const distination = $('#destination').val();
        const firstTrain = $('#firstTrainTime').val();
        const frequency = $('#frequency').val();

        // puch values to the arrays
        trainNameArray.push(trainName);
        destinationArray.push(distination)
        firstTrainTimeArray.push(firstTrain)
        frequencyArray.push(frequency)

        // function that creates and add data to firebase.
        db.ref('trainschedule').set({

            train: trainNameArray,
            trainDistination: destinationArray,
            trainFirstTrain: firstTrainTimeArray,
            trainFrequency: frequencyArray,
        });

        // to clear input area after submition of entries
        $('#trainName').val('');
        $('#destination').val('');
        $('#firstTrainTime').val('');
        $('#frequency').val('');
    });


    //  function to bring back the data from firebase
    db.ref('trainschedule').on('value', snap => {
        trainNameArray = snap.val().train
        destinationArray = snap.val().trainDistination
        firstTrainTimeArray = snap.val().trainFirstTrain
        frequencyArray = snap.val().trainFrequency

        // function to avoid multi entries of data.
        $('.trainName').empty();
        $('.destination').empty();
        $('.firstTrainTime').empty();
        $('.frequency').empty();

        // function to append the values to the webpage
        trainNameArray.map((train) => {
            $('#displayName').append(`<tr><td>${train}</td></tr>`)
        });

        destinationArray.map((trainDistination) => {
            $('#displayDestination').append(`<tr><td>${trainDistination}</td></tr>`)
        });

        frequencyArray.map((trainFrequency) => {
            $('#displayFrequency').append(`<tr><td>${trainFrequency}</td></tr>`)
        });


    });


    // still need to work on function that calculates "Next arrival train 
    // & another that calculate "minutes away"



});
