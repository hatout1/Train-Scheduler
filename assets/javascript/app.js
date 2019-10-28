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

    const db = firebase.database()

    // arrays to hold admin entries
    var trainName = [];
    var destination = [];
    var firstTrainTime = [];
    var frequency = [];

    // function that collect data on click submit btn and assign it to arrays
    $('.btn').on('click', function () {
        (trainName).push($('#trainName').val());
        (destination).push($('#destination').val());
        (firstTrainTime).push($('#firstTrainTime').val());
        (frequency).push($('#frequency').val());

        // console.log(trainName);

    });

    db.ref().on('value', snap => {

        // console.log(snap.val());

    })



});