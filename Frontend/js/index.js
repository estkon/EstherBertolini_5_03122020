let main = document.getElementById("main");      //récupération de l'element id=main
const section = document.createElement("section"); //création d'une section
section.setAttribute('class',"ours");// ajout de la class ours à la section
main.appendChild(section);           // cette section est un enfant de main => définir sa position html


let ours = document.getElementsByClassName("ours");      //récupération de l'element class= ours
const div = document.createElement("div");              //création d'une div
div.section.setAttribute('class',"ours");                   // ajout de la class ours__info à la div
ours.appendChild(div);           // cette div est un enfant de ours => définir sa position html

// let cardMeuble = document.createElement("div");
// cardMeuble.setAttribute('class', 'card col-md-5 p-2 m-2 col-xs-12');
// document.getElementById("article").appendChild(cardMeuble);

// // mise en place de l'image dans la carte
// let imageCard = document.createElement('img');
// cardMeuble.appendChild(imageCard);
// imageCard.setAttribute('src', meuble.imageUrl);
// imageCard.setAttribute('class', "card-img-top");
// imageCard.setAttribute('alt', 'Une image de notre meuble');

// // Mise en place du texte sous l'image dans la carte
// let bodyCard = document.createElement('div');
// cardMeuble.appendChild(bodyCard);
// bodyCard.setAttribute('class','cord-body’);