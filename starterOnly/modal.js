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

  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthDate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const checkbox = document.querySelectorAll(".radio-input");
  const cguCheckBox = document.getElementById("checkbox1");

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    birthDate: birthDate.value,
    quantity: quantity.value,
  }

  let error = {};

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const numberRegex = /^\d+$/;

  const isChecked = Array.from(checkbox).filter(input => input.checked);

  const selectedBirthDate = new Date(data.birthDate);
  const currentDate = new Date(Date.now());

  data.firstName === "" || data.firstName.length < 2 ? error.firstName = true : error.firstName = false;
  data.lastName === "" || data.lastName.length < 2 ? error.lastName = true : error.lastName = false;
  data.email === "" || !data.email.match(emailRegex) ? error.email = true : error.email = false;
  !data.birthDate || selectedBirthDate.getFullYear() > currentDate.getFullYear() - 16 ? error.birthDate = true : error.birthDate = false;
  data.quantity === "" || !data.quantity.match(numberRegex) || data.quantity < 0 || data.quantity > 99 ? error.quantity = true : error.quantity = false;
  isChecked.length <= 0 ? error.location = true : error.location = false;
  !cguCheckBox.checked ? error.cgu = true : error.cgu = false;  

  // Error check and define firstname
  const firstNameErrorLabel = document.getElementById("firstError");
  if (error.firstName) {
    if (firstName.classList[1] !== "error-input") {
      firstName.classList.toggle("error-input");
      firstNameErrorLabel.style.display = "inline-block";
    }
  } else {
    if (firstName.classList[1] === "error-input") {
      firstName.classList.toggle("error-input");
      firstNameErrorLabel.style.display = "none";
    }
  }

  // Error check and define lastname
  const lastNameErrorLabel = document.getElementById("lastError");
  if (error.lastName) {
    if (lastName.classList[1] !== "error-input") {
      lastName.classList.toggle("error-input");
      lastNameErrorLabel.style.display = "inline-block";
    }
  } else {
    if (lastName.classList[1] === "error-input") {
      lastName.classList.toggle("error-input");
      lastNameErrorLabel.style.display = "none";
    }
  }

  // Error check and define email
  const emailErrorLabel = document.getElementById("emailError");
  if (error.email) {
    if (email.classList[1] !== "error-input") {
      email.classList.toggle("error-input");
      emailErrorLabel.style.display = "inline-block";
    }
  } else {
    if (email.classList[1] === "error-input") {
      email.classList.toggle("error-input");
      emailErrorLabel.style.display = "none";
    }
  }

  // Error check and define birthDate
  const birthDateErrorLabel = document.getElementById("birthDateError");
  if (error.birthDate) {
    if (birthDate.classList[1] !== "error-input") {
      birthDate.classList.toggle("error-input");
      birthDateErrorLabel.style.display = "inline-block";
    }
  } else {
    if (birthDate.classList[1] === "error-input") {
      birthDate.classList.toggle("error-input");
      birthDateErrorLabel.style.display = "none";
    }
  }

  // Error check and define quantity
  const quantityErrorLabel = document.getElementById("quantityError");
  if (error.quantity) {
    if (quantity.classList[1] !== "error-input") {
      quantity.classList.toggle("error-input");
      quantityErrorLabel.style.display = "inline-block";
    }
  } else {
    if (quantity.classList[1] === "error-input") {
      quantity.classList.toggle("error-input");
      quantityErrorLabel.style.display = "none";
    }
  }

  // Error check and define location
  const locationErrorLabel = document.getElementById("locationError");
  if (error.location) {
    if (locationErrorLabel.style.display !== "inline-block") {
      locationErrorLabel.style.display = "inline-block";
    }
  } else {
    if (locationErrorLabel.style.display === "inline-block") {
      locationErrorLabel.style.display = "none";
    }
  }

  // Error check and define cgu
  const cguErrorLabel = document.getElementById("cguErrorLabel");
  if (error.cgu) {
    if (cguErrorLabel.style.display !== "inline-block") {
      cguErrorLabel.style.display = "inline-block";
    }
  } else {
    if (cguErrorLabel.style.display === "inline-block") {
      cguErrorLabel.style.display = "none";
    }
  }

  !error.firstName && !error.lastName && !error.email && !error.birthDate && !error.location && !error.quantity && !error.cgu ? alert("Merci ! Votre réservation a été reçue.") : event.preventDefault();


}