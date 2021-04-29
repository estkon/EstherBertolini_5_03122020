//Création de la section "ours"

let main = document.getElementById("main");      //récupération de l'element id=main
const section = document.createElement("section"); //création d'une section (carte)
section.setAttribute('class',"ours");// ajout de la class ours à la section
main.appendChild(section);           // cette section est un enfant de main => définir sa position html

//Création de la div "ours__info" & "ours__texte--boutons"

let infoTeddy = document.createElement('div');
let buttonTeddy = document.createElement('div');
infoTeddy.setAttribute('class', 'ours__info');
buttonTeddy.setAttribute('class', 'ours__texte--boutons');
section.appendChild(infoTeddy);
section.appendChild(buttonTeddy);

//Création de la div ours__img & ours__texte

let imageTeddy = document.createElement('div');
let textTeddy = document.createElement('div');
imageTeddy.setAttribute('class', 'ours__img');
textTeddy.setAttribute('class', 'ours__texte');
infoTeddy.appendChild(imageTeddy);
infoTeddy.appendChild(textTeddy);

// mise en place de l'image dans la div ours__img

// let lienOurs = document.createElement('a');
// let imageDeOurs= document.createElement('img');
// imageTeddy.appendChild(lienOurs);
// lienOurs.appendChild(imageDeOurs);
// imageDeOurs.setAttribute('src', imageUrl);
// imageDeOurs.setAttribute('alt', 'Une image de notre ours');

// Mise en place du texte dans la div ours__texte

let titleCard = document.createElement('h3');
let descriptionCard = document.createElement('p');
descriptionCard.setAttribute('class', 'ours__texte--description');
let priceCard = document.createElement('p');
priceCard.setAttribute('class', 'ours__texte--prix');
textTeddy.appendChild(titleCard);
textTeddy.appendChild(descriptionCard);
textTeddy.appendChild(priceCard);
