let errorField = document.getElementById('errors');
let form = document.getElementById('contactForm');
let errorMessages = [];

let checkLastname = function () {
    let lastname = document.getElementById('lastname').value;
    if (!lastname) {
        errorMessages.push('Le nom est obligatoire.');
    }
    if (lastname.length < 4) {
        errorMessages.push('Le nom est trop court, minimum 4 caractères.');
    }
}

let checkFirstname = function () {
    let firstname = document.getElementById('firstname').value;
    if (!firstname) {
        errorMessages.push('Le prénom est obligatoire.');
    }
    if (firstname.length < 4) {
        errorMessages.push('Le prénom est trop court, minimum 4 caractères.');
    }
}

let checkAge = function () {
    let age = document.getElementById('age').value;
    if (!age) {
        errorMessages.push('Le message est obligatoire.');
    }
    if (age < 18) {
        errorMessages.push('Il faut avoir au moins 18 ans.');
    }
}

let checkMail = function () {
    let mail = document.getElementById('email').value;
    if (!mail) {
        errorMessages.push('Le message est obligatoire.');
    }
    if (mail.length < 4) {
        errorMessages.push('Le mail est trop court, minimum 4 caractères.');
    }
    if (!mail.match(/^[a-z0-9][a-z0-9\.-]*@[a-z]+\.[a-z]{2,3}$/)) {
        errorMessages.push('Le mail doit être de forme adéquate (xxx@xxx.xx)');
    }

}

let checkTel = function () {
    let tel = document.getElementById('tel').value;
    if (!tel) {
        errorMessages.push('Le message est obligatoire.');
    }
    if (!tel.match(/^\d{10}$/)) {
        errorMessages.push('Le téléphone n\'a pas le bon format (10 chiffres)');
    }
}

let checkChannel = function () {
    let channel = document.getElementById('channel').value;
    if (!channel) {
        errorMessages.push('Le moyen de contact est obligatoire.');
    }
}

let checkMessage = function () {
    let message = document.getElementById('message').value;
    if (!message) {
        errorMessages.push('Le message est obligatoire.');
    }
    if (message.length > 50) {
        errorMessages.push('Le message est trop long, maximum 50 caractères.');
    }
}

let displayErrorMessages = function () {
    for (let i = 0; i < errorMessages.length; i++) {
        let newLi = document.createElement('li');
        newLi.textContent = errorMessages[i];
        errorField.appendChild(newLi);
    }
}

let handleValidateForm = function (evt) {
    evt.preventDefault();

    errorMessages = [];
    
    checkLastname();
    checkFirstname();
    checkAge();
    checkMail();
    checkTel();
    checkChannel();
    checkMessage();

    if (errorMessages.length > 0) {
        errorField.innerHTML = '';
        errorField.classList.remove('d-none');
        displayErrorMessages();
    } else {
        errorField.classList.add('d-none');
    }
}

form.addEventListener('submit', handleValidateForm);
