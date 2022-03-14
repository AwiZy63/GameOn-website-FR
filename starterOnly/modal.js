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
modalBtn.forEach((btn) => btn.addEventListener("click", () => modalbg.style.display = "block"));

// close modal function
const modalCloseButton = document.getElementById("modalCloseButton");

// set modal style to display none when close button clicked
modalCloseButton.addEventListener("click", () => modalbg.style.display = "none");

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
  data.firstName === "" || data.firstName.length < 2 ? error.firstName = true : null;
  // Le champs de nom de famille ne doit pas être vide et doit comporter au minimum 2 caractères.
  data.lastName === "" || data.lastName.length < 2 ? error.lastName = true : null;
  // Le champs de l'email ne doit pas être vide et doit correspondre au regex d'une email valide (voir ligne 60).
  data.email === "" || !data.email.match(emailRegex) ? error.email = true : null;
  // La date de naissance doit être selectionnée et l'utilisateur doit avoir au moins 16 ans.
  !data.birthDate || selectedBirthDate.getFullYear() > currentDate.getFullYear() - 16 ? error.birthDate = true : null;
  // Le nombre de participation doit être renseignée et doit correspondre au regex qui indique que la donnée rentrée doit être un nombre valide (voir ligne 62) entre 0 et 99.
  data.quantity === "" || !data.quantity.match(numberRegex) || data.quantity < 0 || data.quantity > 99 ? error.quantity = true : null;
  // Une option de localisation doit être selectionnée.
  isChecked.length <= 0 ? error.location = true : null;
  // La case des conditions générales d'utilisations doit être cochée
  !cgu.checked ? error.cgu = true : null;

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
  Object.keys(error).length === 0 ? confirmForm(event) : event.preventDefault();
}

function confirmForm(event) {
  event.preventDefault();
  
  reservationForm.style.display = 'none';
  const modalBody = document.querySelector(".modal-body");
  
  const button = document.createElement("button");
  button.innerText = "C'est parti"
  button.classList.add("btn-submit");
  button.classList.add("button");
  button.style.marginTop = "24px";

  const p = document.createElement("p");
  p.innerText = "Merci, votre inscription a été prise en compte !";
  p.style.marginTop = "16px";
  p.style.marginBottom = "16px";

  modalBody.appendChild(p);
  p.append(button);

  button.addEventListener("click", () => reservationForm.submit())
}