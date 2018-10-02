  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCipZV5w7sFg2eKJH77gKXC7-oiwOuJfTA",
    authDomain: "trainschedule-6a0dc.firebaseapp.com",
    databaseURL: "https://trainschedule-6a0dc.firebaseio.com",
    projectId: "trainschedule-6a0dc",
    storageBucket: "trainschedule-6a0dc.appspot.com",
    messagingSenderId: "133734588401"
  };
  firebase.initializeApp(config);
  firebase.initializeApp(config);
  var database = firebase.database();

  //console.log(database);

// When I click the submit button, do the following:
$("#add-train-btn").on("click", function(){
	
	// Set up new variables that get tha value from the form
	// I will need to use those variables later
	var newName = $("#trainName").val().trim();
	var newDestination = $("#destination").val().trim();
	var newFirstTime = $("#firstTime").val().trim();
	var newFrequency = $("#frequency").val().trim();

	//console.log(newName, newDestination, newFirstTime, newFrequency);



	// Create a new object and push it to the database
	var newTrain = {
		name: newName,
		dest: newDestination,
		first: newFirstTime,
		freq: newFrequency,
	}

	//console.log(newTrain);



	 database.ref().push(newTrain);

	// Clear out the form fields
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTime").val("");
	$("#frequency").val("");

	// //data from submit form

	// console.log("newTrain: " + newTrain);
	// console.log("Name: " + newTrain.name);
	// console.log("Destination: " + newTrain.dest);
	// console.log("First Time: " + newTrain.first);
	// console.log("Frequency: " + newTrain.freq);


	return false;
}); 

var currentTime = moment();
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	
	
	
	//console.log("Child Snapshot Value: " + childSnapshot.val());

	var newName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().dest;
	var newFirstTime = childSnapshot.val().first;
	var newFrequency = childSnapshot.val().freq;

	// console.log("newName: " + newName);
	// console.log("newDestination: " + newDestination);
	// console.log('newFirstTime', newFirstTime)
	// console.log("newFrequency: " + newFrequency);


	//MOMENT

	console.log("arrival time: " + newFirstTime);
	console.log("current time: " + moment(currentTime).format("hh:mm"));

	//arrival time - minus current time
	var timeDiff = moment().subtract(newFirstTime, currentTime);
	console.log("time diff: " + timeDiff);

 	
	var x = moment(timeDiff).format("hh:mm a");
	console.log("minutes: " + x);


		// var firstTimeConverted = moment(newFirstTime, "hh:mm").subtract(1, "days");
	
	// // Get the difference between now and the time of the first train
	// // by subtracting the current time from the first train time
	// timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
	// console.log("Difference in time: " + timeDiff);

	 //Time apart
	 var remainder = timeDiff % newFrequency;
	 console.log("Remainder: ", remainder);

	// // Minutes until the next train calculated by subtracting the the remainder from the frequency
	// var minsUntilTrain = newFrequency - remainder;
	// console.log("Time Til Train: " + minsUntilTrain);

	// // Calculate next train time by adding the current time to the minsUntilTrain
	// var nextTrainTime = moment().add(minsUntilTrain, "minutes");
	// console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));

	$("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + newFirstTime + "</td><td>" + remainder);
	// $("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain);

}); 
