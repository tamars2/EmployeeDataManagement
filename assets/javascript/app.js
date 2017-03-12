$( document ).ready(function() {
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
  	database.ref('/employees').push({
  		employeeName: employeeName,
  		role: role,
  		startDate: startDate,
  		monthlyRate: monthlyRate,
      // TIMESTAMP records when data was added around the globe according to the server time
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  });

  database.ref('/employees').on("child_added", function(childSnapshot) {

      // // Log everything that's coming out of snapshot
      // console.log(childSnapshot.val().employeeName);
      // // console.log(childSnapshot.val().role);
      // // console.log(childSnapshot.val().startDate);
      // // console.log(childSnapshot.val().monthlyRate);
      // console.log(childSnapshot.key);
      // //user inserts info
      // //user clicks submit
      // //submit push data to firebase
      // var row = $('<tr>');
      // var childID = childSnapshot.key;
      // row.addClass('employee');
      // row.attr("id", childID);
      // $('#employees').append(row);
      // var x = "#" + childID;

      // var name = $('<td>');
      // name.text(childSnapshot.val().employeeName);
      // $(x).append(name);

      // var employeeRole = $('<td>');
      // employeeRole.text(childSnapshot.val().role);
      // $(x).append(employeeRole);

      // var empStartDate = $('<td>');
      // empStartDate.text(childSnapshot.val().startDate);
      // $(x).append(empStartDate);


      var empName = childSnapshot.val().employeeName;
      var empRole = childSnapshot.val().role;
      var empStartDate = childSnapshot.val().startDate;
      var empMonthlyRate = childSnapshot.val().monthlyRate;
      var empDateAdded = childSnapshot.val().dateAdded;
      // Created a variable to figure out how many months worked
      var empMonthsWorked = moment(empDateAdded).diff(empStartDate, "months");
      // Created a variable to figure out the total billed amount
      var totalBilled = "$" + empMonthlyRate * empMonthsWorked;

      // console.log(empDateAdded);
      // console.log(empMonthsWorked);
      // console.log(totalBilled);

      // console.log(childSnapshot.val().employeeName);
      // console.log(childSnapshot.val().role);
      // console.log(childSnapshot.val().startDate);
      // console.log(childSnapshot.val().monthlyRate);
      // console.log(childSnapshot.val().dateAdded);

      $("#employees").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStartDate + "</td><td>" + empMonthsWorked + "</td><td>" + empMonthlyRate + "</td><td>" + totalBilled + "</td></tr>");

      }, function (errorObject) {
          console.log('The read failed' + errorObject.code);


  });

});

