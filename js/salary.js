const insuranceRate = 0.07;
const taxRate = 0.18;
const CanadaPensionRate = 0.05;
const salaryForm = document.getElementById('salaryForm');
let errors = [];
let errorsDiv = document.getElementById('errors');
let grossSalaryAmount;
let bonusValue;
let allowanceValue;
let genderValue;
let dependantsNb;

const checkSalary = () => {
    let grossSalary = document.getElementById('grossSalary').value;
    if (!grossSalary) {
        errors.push('Le salaire doit être indiqué')

    } else if (isNaN(grossSalary)) {
        errors.push('Le salaire doit être un nombre écrit en chiffres');
    } else {
        grossSalaryAmount = parseInt(grossSalary);
    }
}

const checkBonus = () => {
    let bonus = document.querySelectorAll('input[name=bonus]');
    bonus.forEach((input) => {
        if (input.checked) {
            bonusValue = parseInt(input.value);
        }
    })
    if (!bonusValue) {
        bonusValue = 0;
    }
}

const checkAllowance = () => {
    let allowance = document.querySelectorAll('input[name=allowance]');
    allowance.forEach((input) => {
        if (input.checked) {
            allowanceValue = parseInt(input.value);
        }
    })
    if (!allowanceValue) {
        allowanceValue = 0;
    }
}

const checkGender = () => {
    let gender = document.querySelectorAll('input[name=gender]');
    gender.forEach((input) => {
        if (input.checked) {
            genderValue = input.id;
        }
    })
    if (!genderValue || !genderValue.match(/^(fe)?male$/)) {
        errors.push('Le sexe est obligatoire');
    }
}

const checkDependants = () => {
    let dependants = document.getElementById('dependants').value;
    if (!dependants) {
        dependantsNb = 0;
    } else if (isNaN(dependants)) {
        errors.push('Le nombre de personnes à charge doit être écrit en chiffres');
    } else {
        dependantsNb = parseInt(dependants);
    }
}
const resetErrors = () => {
    errorsDiv.innerHTML = '';
    errors = [];
}
const checkForm = () => {
    resetErrors();

    checkSalary();
    checkBonus();
    checkAllowance();
    checkGender();
    checkDependants();

    if (errors.length > 0) {
        errors.forEach(error => {
            let newLi = document.createElement('li');
            newLi.textContent = error;
            errorsDiv.appendChild(newLi);
        })
        return false;
    } else {
        return true;
    }
}

const calculateTax = () => {
    let tax = taxRate;
    if (genderValue === 'female') {
        tax -= 0.02;
    }
    if (dependantsNb === 3) {
        tax -= 0.01;
    } else if (dependantsNb >= 4) {
        tax -= 0.02;
    }
    return grossSalaryAmount * tax;
}

const calculateCanadaPension = () => grossSalaryAmount * CanadaPensionRate;

const calculateInsurance = () => grossSalaryAmount * insuranceRate;

const calculateBonuses = () => bonusValue + allowanceValue;

const calculateNetSalary = () => grossSalaryAmount - calculateTax() - calculateInsurance() - calculateCanadaPension() + calculateBonuses();

const calculateSalary = function (evt) {
    // checkForm();
    // console.log(checkForm());
    if (!checkForm()) {
        evt.preventDefault();
    } else {
        evt.preventDefault();
        let resultDiv = document.getElementById('result');
        let newP = document.createElement('p');
        newP.textContent = 'Avec les informations remplies, votre salaire net est de ' + calculateNetSalary() + ' $.';
        resultDiv.appendChild(newP);
    }
}

salaryForm.addEventListener('submit', calculateSalary);