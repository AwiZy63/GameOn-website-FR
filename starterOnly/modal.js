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

const reservationForm = document.getElementById("reservationForm");
reservationForm.addEventListener("submit", (event) => validate(event))

function validate(event) {
  event.preventDefault();

  console.log(event);

  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthDate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const numberRegex = /^\d+$/;

  const checkbox = document.querySelectorAll(".radio-input");

  const checkBoxArray = Array.from(checkbox);
  console.log(checkBoxArray)

  const isChecked = checkBoxArray.filter(input => input.checked);

  const selectedBirthDate = new Date(birthDate);
  const currentDate = new Date(Date.now());

  const error = {
    "firstName": false,
    "lastName": false,
    "email": false,
    "birthDate": false,
    "quantity": false
  };

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
  } else if (!email.match(emailRegex)) {
    // email invalid error
  }

  if (selectedBirthDate.getFullYear() > currentDate.getFullYear() - 16) {
    console.error("Vous devez avoir minimum 16ans pour participer à l'évènement.")
  }

  if (quantity === "") {
    // quantity empty error
  } else if (!quantity.match(numberRegex)) {
    // quantity invalid error
    console.error("La quantité doit être un nombre")
  } else if (quantity < 0 || quantity > 99) {
    console.error("La quantité doit être comprise entre 0 et 99")
  }

  if (isChecked.length <= 0) {
    // checked input error
  }


  console.log([firstName, lastName, email, birthDate, quantity])
  console.log(email.split("@"))
}