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

  // Récupération des elements du html du formulaire.
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthDate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const checkbox = document.querySelectorAll(".radio-input");
  const cgu = document.getElementById("checkbox1");

  // Récupération des valeurs rentrées dans le formulaire.
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    birthDate: birthDate.value,
    quantity: quantity.value,
  }

  // Initialisation d'une liste d'erreur vide.
  let error = {};

  // Regex
  // Email validation
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
  // Number validation
  const numberRegex = /^\d+$/;

  // Vérification qu'une option est séléctionnée, si c'est le cas, la fonction filter nous renvoi au moins 1 résultat.
  const isChecked = Array.from(checkbox).filter(input => input.checked);

  // Gestion des dates pour les conditions d'envois
  const selectedBirthDate = new Date(data.birthDate);
  const currentDate = new Date(Date.now());

  // Création des conditions d'envoi du formulaire.
  // Le champs du prénom ne doit pas être vide et doit comporter au minimum 2 caractères.
  data.firstName === "" || data.firstName.length < 2 ? error.firstName = true : error.firstName = false;
  // Le champs de nom de famille ne doit pas être vide et doit comporter au minimum 2 caractères.
  data.lastName === "" || data.lastName.length < 2 ? error.lastName = true : error.lastName = false;
  // Le champs de l'email ne doit pas être vide et doit correspondre au regex d'une email valide (voir ligne 60).
  data.email === "" || !data.email.match(emailRegex) ? error.email = true : error.email = false;
  // La date de naissance doit être selectionnée et l'utilisateur doit avoir au moins 16 ans.
  !data.birthDate || selectedBirthDate.getFullYear() > currentDate.getFullYear() - 16 ? error.birthDate = true : error.birthDate = false;
  // Le nombre de participation doit être renseignée et doit correspondre au regex qui indique que la donnée rentrée doit être un nombre valide (voir ligne 62) entre 0 et 99.
  data.quantity === "" || !data.quantity.match(numberRegex) || data.quantity < 0 || data.quantity > 99 ? error.quantity = true : error.quantity = false;
  // Une option de localisation doit être selectionnée.
  isChecked.length <= 0 ? error.location = true : error.location = false;
  // La case des conditions générales d'utilisations doit être cochée
  !cgu.checked ? error.cgu = true : error.cgu = false;

  const createError = (element, errorName) => {
    // Création d'un tableau pour l'insertion d'une variable temporaire pour la fonction.
    const errorLabel = [];
    // Insertion d'une variable temporaire dans le tableau précédent pour la fonction par rapport au nom de l'erreur.
    errorLabel[errorName] = document.getElementById(`${errorName}Error`);
    // Condition ternaire qui vérifie si l'erreur correspondant est oui ou non activée.
    error[errorName] ?
      // Si oui, on vérifie si l'erreur n'est déjà affichée.
      errorLabel[errorName].style.display !== "inline-block" ?
        // Si c'est le cas, on vérifie si l'élement est un input ou si c'est un bouton radio.
        element.type ?
          // Si c'est un input, on active la classe d'erreur sur le champ du formulaire ainsi que le texte d'erreur.
          (element.classList.toggle("error-input"),
            errorLabel[errorName].style.display = "inline-block")
          :
          // Sinon on affiche uniquement le texte.
          errorLabel[errorName].style.display = "inline-block"
        :
        // Si l'erreur est déjà affichée et que le champs est toujours considéré comme en erreur, alors on ne fait rien.
        null
      :
      // Si le champ n'est plus en erreur alors on vérifie si l'erreur est affichée ou non.
      errorLabel[errorName].style.display === "inline-block" ?
        // Si c'est le cas, on vérifie si l'élement est un input ou si c'est un bouton radio.
        element.type ?
          // Si c'est un input, on désactive la classe d'erreur sur le champ du formulaire ainsi que le texte d'erreur.
          (element.classList.toggle("error-input"),
            errorLabel[errorName].style.display = "none")
          :
          // Sinon on désactive uniquement le texte.
          errorLabel[errorName].style.display = "none"
        :
        // Si l'erreur n'est pas affichée et que le champs n'est pas non plus en erreur, alors on ne fait rien. 
        null
  }

  // Création des messages d'erreurs.
  createError(firstName, "firstName")
  createError(lastName, "lastName")
  createError(email, "email")
  createError(birthDate, "birthDate")
  createError(quantity, "quantity")
  createError(isChecked, "location")
  createError(cgu, "cgu")

  // Vérification des conditions de validation du formulaire et envoi. (Le fomulaire ne s'envoit pas si les conditions ne sont pas respectés).
  !error.firstName && !error.lastName && !error.email && !error.birthDate && !error.location && !error.quantity && !error.cgu ? alert("Merci ! Votre réservation a été reçue.") : event.preventDefault();

}