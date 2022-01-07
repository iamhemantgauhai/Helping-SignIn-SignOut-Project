// var input = document.querySelector("#txtPhone"),
//   errorMsg = document.querySelector("#error-msg"),
//   validMsg = document.querySelector("#valid-msg");

// // here, the index maps to the error code returned from getValidationError - see readme
// var errorMap = [
//   "Invalid number",
//   "Invalid country code",
//   "Too short",
//   "Too long",
//   "Invalid number",
// ];

// // initialise plugin
// var iti = window.intlTelInput(input, {
//   utilsScript: "../../build/js/utils.js?1638200991544",
// });

// var reset = function () {
//   input.classList.remove("error");
//   errorMsg.innerHTML = "";
//   errorMsg.classList.add("hide");
//   validMsg.classList.add("hide");
// };

// // on blur: validate
// input.addEventListener("blur", function () {
//   reset();
//   if (input.value.trim()) {
//     if (iti.isValidNumber()) {
//       validMsg.classList.remove("hide");
//     } else {
//       input.classList.add("error");
//       var errorCode = iti.getValidationError();
//       errorMsg.innerHTML = errorMap[errorCode];
//       errorMsg.classList.remove("hide");
//     }
//   }
// });

// // on keyup / change flag: reset
// input.addEventListener("change", reset);
// input.addEventListener("keyup", reset);
// ///////////////////////////////////////

var alldata = [];
// Here storing the data in localStorege
function storedata() {
  localStorage.setItem("details", JSON.stringify(alldata));
  Swal.fire("Your account has been created");
}

// This function for storing data in localStorege and user sign-up
function store(e) {
  e.preventDefault();
  getdata();
  var signForm = document.getElementById("sign-up");
  var email = document.getElementById("email");
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var phoneNo = document.getElementById("txtPhone");
  var pincode = document.getElementById("shipaddress");
  var birthday = document.getElementById("birthday");
  var pw = document.getElementById("pw");

  let studentData = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNo: phoneNo.value,
    pincode: pincode.value,
    birthday: birthday.value,
    pw: pw.value,
  };
  // console.log(studentData);

  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  ///////////////
  function validMail(email) {
    console.log("hello");
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
      email
    );
  }
  if (!validMail(email.value)) {
    console.log(!validMail(email.value));
    Swal.fire("You have entered an invalid email address!");
    return;
  } else if (!iti.isValidNumber()) {
    Swal.fire("You have entered an invalid phone number!");
    console.log(!iti.isValidNumber());
    return;
  } else if (
    email.value == "" ||
    firstName.value == "" ||
    lastName.value == "" ||
    phoneNo.value == "" ||
    birthday.value == "" ||
    shipaddress.value == "" ||
    pw.value == ""
  ) {
    Swal.fire("Input Fields cant't be null");
  }
  // ////
  var userName = alldata.map((i) => i.email);
  // console.log(alldata);
  // console.log(userName, email.value);
  if (userName.includes(email.value)) {
    Swal.fire("This user id is already exists.");
    return;
  } else if (pw.value.length > 8) {
    Swal.fire("Max of 8");
    return;
  } else if (!pw.value.match(numbers)) {
    Swal.fire("please add 1 number");
    return;
  } else if (!pw.value.match(upperCaseLetters)) {
    Swal.fire("please add 1 uppercase letter");
    return;
  } else if (!pw.value.match(lowerCaseLetters)) {
    Swal.fire("please add 1 lovercase letter");
    return;
  } else if (birthday.value != "") {
    var today = new Date();
    var birthDate = new Date(birthday.value);
    console.log(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    console.log(age);
    if (age < 18  ) {
      Swal.fire("Age " + age + " is restrict");
      return;
    }
  }
  alldata.push(studentData);
  storedata();
  signForm.reset();
}

// Here  getting all the data from localstorege
function getdata() {
  var localdata = JSON.parse(localStorage.getItem("details"));
  console.log(localdata);

  if (localdata != null) {
    for (i of localdata) {
      alldata.push(i);
    }
  }
}

//checking  function for login user
function check(e) {
  e.preventDefault();
  getdata();
  var loginForm = document.getElementById("login-form");
  var storedName = localStorage.getItem("email");
  var storedfirstName = localStorage.getItem("firstName");
  var storedlastName = localStorage.getItem("lastName");
  var storedphoneNo = localStorage.getItem("txtPhone");
  var storedpincode = localStorage.getItem("shipaddress");
  var storedPw = localStorage.getItem("pw");
  var userName = document.getElementById("userName");
  var userPw = document.getElementById("userPw");
  var userRemember = document.getElementById("rememberMe");

  var userdata = alldata.filter((i) => i.email == userName.value);
  // console.log(userdata, userName);
  if (userdata.length > 0) {
    if (userdata[0].pw == userPw.value) {
      Swal.fire("Your  are logined successfully");
      loginForm.reset();
    } else {
      Swal.fire("Please enter valid password!");
    }
  } else {
    Swal.fire("Please enter your valid user id!");
  }
}

// /////////////
// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  let address1Field = document.querySelector("#shipaddress");
  let autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["in"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed");
}
