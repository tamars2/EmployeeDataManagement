console.log("test");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9oSd6t33HHOFIzoTY43iV4dfsOAsVthA",
    authDomain: "employee-data-management-f4a3f.firebaseapp.com",
    databaseURL: "https://employee-data-management-f4a3f.firebaseio.com",
    storageBucket: "employee-data-management-f4a3f.appspot.com",
    messagingSenderId: "1000558614453"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  var employeeName = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;

  $('#add-user').on("click", function(event){
  	event.preventDefault();

  	employeeName = $('#employee-name').val().trim();
  	role = $('#role-input').val().trim();
  	startDate = $('#start-input').val().trim();
  	monthlyRate = $('#monthly-input').val().trim();

  	database.ref().push({
  		employeeName: employeeName,
  		role: role,
  		startDate: startDate,
  		monthlyRate: monthlyRate,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  });

