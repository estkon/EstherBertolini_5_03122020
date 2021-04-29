//Création de la section "ours"

let cardTeddy = document.getElementById("main");      //récupération de l'element id=main
const section = document.createElement("section"); //création d'une section (carte)
cardTeddy.setAttribute('class',"ours");// ajout de la class ours à la section
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