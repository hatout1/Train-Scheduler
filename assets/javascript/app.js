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

    // variable to help with entries order
    var ordernumber = 0;

    // function that collect data on click submit btn and assign it to arrays
    $('.btn').on('click', function (event) {
        event.preventDefault();

        // increment ordernumber when the buton clicked
        ordernumber += 1;
        console.log(ordernumber)

        // function that creates and add data to firebase.
        db.ref(ordernumber).set({
            ordernumber: ordernumber,
            trainName: $('#trainName').val(),
            destination: $('#destination').val(),
            firstTrainTime: $('#firstTrainTime').val(),
            frequency: $('#frequency').val(),
        });

        // console.log(trainName);

        db.ref(ordernumber).on('value', snap => {
            console.log(snap.val());

        })

    });

});