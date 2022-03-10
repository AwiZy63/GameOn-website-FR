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
  const cgu = document.getElementById("checkbox1");

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
  !cgu.checked ? error.cgu = true : error.cgu = false;


  let errorsTypes = [firstName, lastName, email, birthDate, quantity]

  const createError = (element, errorName) => {
    let errorLabel = [];
    errorLabel[errorName] = document.getElementById(`${errorName}Error`);
    if (error[errorName]) {
      if (errorLabel[errorName].style.display !== "inline-block") {
        if (element.type) {
          element.classList.toggle("error-input");
        }
        errorLabel[errorName].style.display = "inline-block";
      }
    } else {
      if (errorLabel[errorName].style.display === "inline-block") {
        if (element.type) {
          element.classList.toggle("error-input");
        }
        errorLabel[errorName].style.display = "none";
      }
    }
  }

  createError(firstName, "firstName")
  createError(lastName, "lastName")
  createError(email, "email")
  createError(birthDate, "birthDate")
  createError(quantity, "quantity")
  createError(isChecked, "location")
  createError(cgu, "cgu")

  !error.firstName && !error.lastName && !error.email && !error.birthDate && !error.location && !error.quantity && !error.cgu ? alert("Merci ! Votre réservation a été reçue.") : event.preventDefault();

}