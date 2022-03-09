function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal function
const modalCloseButton = document.getElementById("modalCloseButton");

modalCloseButton.addEventListener("click", closeModal);
function closeModal() {
  // set modal style to display none when close button clicked
  modalbg.style.display = "none";
}

function validate(event) {
  event.preventDefault();
  console.log(event)
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthDate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;


  if (firstName === "") {
    // Firstname empty error
    console.error("firstname field is required");
  } else if (firstName.length < 2) {
    // Firstname length error
    console.error("firstname must be greater or equal to 2");
  }

  if (lastName === "") {
    // lastname empty error
    console.error("lastname field is required");
  } else if (lastName.length < 2) {
    // lastname length error
    console.error("lastname must be greater or equal to 2");
  }

  if (email === "") {
    // email empty error
  }


    console.log([firstName, lastName, email, birthDate, quantity])
    console.log(email.split("@"))
}