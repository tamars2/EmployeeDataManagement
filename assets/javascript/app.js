console.log("js is linked properly");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9oSd6t33HHOFIzoTY43iV4dfsOAsVthA",
    authDomain: "employee-data-management-f4a3f.firebaseapp.com",
    databaseURL: "https://employee-data-management-f4a3f.firebaseio.com",
    storageBucket: "employee-data-management-f4a3f.appspot.com",
    messagingSenderId: "1000558614453"
  };
  
  firebase.initializeApp(config);
  //handshake with firebase
  var database = firebase.database();
  //default values for global vars
  var employeeName = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;
  //on submit button click, store field values to firebase database as new employee
  $('#add-user').on("click", function(event){
  	event.preventDefault();

  	employeeName = $('#employee-name').val().trim();
  	role = $('#role-input').val().trim();
  	startDate = $('#start-input').val().trim();
  	monthlyRate = $('#monthly-input').val().trim();
  	//store values of global variables to firebase
  	database.ref().push({
  		employeeName: employeeName,
  		role: role,
  		startDate: startDate,
  		monthlyRate: monthlyRate,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  });

  database.ref().on("child_added", function(childSnapshot) {

  	console.log
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().employeeName);
      // console.log(childSnapshot.val().role);
      // console.log(childSnapshot.val().startDate);
      // console.log(childSnapshot.val().monthlyRate);
      console.log(childSnapshot.key);
      //user inserts info
      //user clicks submit
      //submit push data to firebase
      var row = $('<tr>');
      var childID = childSnapshot.key;
      row.addClass('employee');
      row.attr("id", childID);
      $('#employees').append(row);
      var x = "#" + childID;

      var name = $('<td>');
      name.text(childSnapshot.val().employeeName);
      $(x).append(name);

      var employeeRole = $('<td>');
      employeeRole.text(childSnapshot.val().role);
      $(x).append(employeeRole);

      var empStartDate = $('<td>');
      empStartDate.text(childSnapshot.val().startDate);
      $(x).append(empStartDate);



  });

