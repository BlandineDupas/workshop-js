function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let secretNumber;
let attempt = null;

// Fonction qui demande un chiffre à l'utilisateur
function askNumberUser(count, text = 'Proposez un nombre...') {
    attempt = Number(prompt('Essai n°' + count + ' : ' + text));
}

// Fonction qui donne un indice à l'utilisateur selon son essai
function giveHint(attemptNumber, count) {
    if (attemptNumber < secretNumber) {
        askNumberUser(count, 'Le nombre à deviner est plus grand.');
    } 
    else if (attemptNumber > secretNumber) {
        askNumberUser(count, 'Le nombre à deviner est plus petit.');
    }
}

// Fonction qui vérifie que la donnée entrée est valide
function verifyNumber(attemptNumber, min = 1, max = 1000) {
    if (attemptNumber < min || attemptNumber > max || isNaN(attemptNumber)) {
        alert('Vous devez entrer un nombre entre ' + min + ' et ' + max + ' compris');
    } 
    else {
        return true;
    }
}


/**
 * Fonction qui génère le jeu entièrement
 * Demande un nombre à l'utilisateur
 * Renvoie un indice
 * Répète ces deux étapes tant que ce n'est pas bon
 * Affiche un message de félicitations quand on a trouvé
 */ 
function game() {
    // Initialisation du compteur et du nombre secret
    let count = 1;
    secretNumber = random(1, 1000);
    console.log(secretNumber);
    // On demande au joueur une proposition
    askNumberUser(count);
    // Tant que la donnée n'est pas valide, on affiche un message d'erreur et on redemande
    while (verifyNumber(attempt) != true) {
        askNumberUser(count);
    }
    while (secretNumber != attempt) {
        count++;
        // console.log(attempt);
        giveHint(attempt, count);
    }
    // Si c'est bon, félicitations
    if (count === 1) { // du premier coup
        alert('WOUAH !!! Quelle chance ! Vous avez trouvé du premier coup !');
    }
    else {
        alert('Bravo !!! Le nombre secret était ' + secretNumber + ' et vous avez trouvé ' + attempt + ' en ' + count + ' essais. Pour rejouer cliquez à nouveau sur le bouton ;)');
    }
}

/**
 * Fonction qui génère le jeu entièrement
 * Demande un nombre à l'utilisateur
 * Renvoie un indice
 * Répète ces deux étapes tant que ce n'est pas bon mais avec 10 tentatives maximum
 * Affiche un message de félicitations quand on a trouvé
 * Au bout de 10 tentatives, affiche un message Perdu...
 */ 
function gameLimited() {
    // Initialisation du compteur
    let count = 1;
    secretNumber = random(1, 1000);
    console.log(secretNumber);
    // On demande au joueur une proposition
    askNumberUser(count);
    while (secretNumber != attempt && count < 10) {
        // Tant que la donnée n'est pas valide, on affiche un message d'erreur et on redemande
        while (verifyNumber(attempt) != true) {
            askNumberUser(count);
        }
        // On augmente le compteur
        count++;
        // Le nombre est valide, on donne un indice
        giveHint(attempt, count);
    }
    // Le compteur est arrivé au bout, perdu... On précise la différence pour ne pas avoir un double message bravo puis perdu si on trouve au dernier moment
    if (attempt != secretNumber) {
        alert('Perdu... Vous avez déjà fait ' + count + ' tentatives ' + secretNumber + '. Réactualisez la page pour essayer de deviner un autre nombre;)');
    }
    // Si c'est bon, félicitations
    else if (count === 1) { // du premier coup
        alert('WOUAH !!! Quelle chance ! Vous avez trouvé du premier coup !');
    }
    else {
        alert('Bravo !!! Le nombre secret était ' + secretNumber + ' et vous avez trouvé ' + attempt + ' en ' + count + ' essais. Pour rejouer cliquez à nouveau sur le bouton ;)');
    }  
}



// GAME 3
// OK => ce jeu permet de proposer au joueur de choisir les bornes min et max
// => choisir la limite d'essais
function gameWithChoice() {
    // Choix des bornes :
    let min = null;
    let max = null;
    let error = null;
    while (!(min && max && max > min)) {
        if (min == null || max == null) {
            error = '';
        }
        else {
            error = 'ERREUR ! ';
        }
        min = Number(prompt(error + 'Choisissez un minimum :', 1));
        max = Number(prompt('Choisissez un maximum :', 1000));
    }
    
    // Génération d'un nombre secret en fonction :
    secretNumber = random(min, max);
    // console.log(secretNumber);
        // Choix de la limite
    let limit = Number(prompt('En combien d\'essais souhaitez-vous réussir ? Si vous ne voulez pas de limite, choisissez 0.', 10));
    if (limit == 0) {
        limit = 10000;
    }
    // Initialisation du compteur
    let count = 1;
    // On demande au joueur une proposition
    askNumberUser(count);
    while (secretNumber != attempt && count < limit) {
        // console.log(attempt);

        // Tant que la donnée n'est pas valide, on affiche un message d'erreur et on redemande
        while (verifyNumber(attempt, min, max) != true) {
            askNumberUser(count);
        }
        // On augmente le compteur
        count++;
        // Le nombre est valide, on donne un indice
        giveHint(attempt, count);
    }
    // Le compteur est arrivé au bout, perdu... On précise la différence pour ne pas avoir un double message bravo puis perdu si on trouve au dernier moment
    if (attempt != secretNumber) {
        alert('Perdu... Vous avez déjà fait ' + limit + ' tentatives. Il fallait trouver ' + secretNumber + '. Re-cliquez sur le bouton pour essayer de deviner un autre nombre;)');
    }
    // Si c'est bon, félicitations
    else if (count === 1) { // du premier coup
        alert('WOUAH !!! Quelle chance ! Vous avez trouvé du premier coup !');
    }
    else {
        alert('Bravo !!! Le nombre secret était ' + secretNumber + ' et vous avez trouvé ' + attempt + ' en ' + count + ' essais. Pour rejouer cliquez à nouveau sur le bouton ;)');
    }    
}

// Je veux que le fonction se déclenche au clic sur un élément
function initElement1() {
    let g1 = document.getElementById('game1');
    g1.onclick = game;
};

function initElement2() {
    let g2 = document.getElementById('game2');
    g2.onclick = gameLimited;
};

function initElement3() {
    let g2 = document.getElementById('game3');
    g2.onclick = gameWithChoice;
};