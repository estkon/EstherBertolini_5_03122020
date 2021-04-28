let main = document.getElementById("main");      //récupération de l'element id=main
const section = document.createElement("section"); //création d'une section
section.classList.add ("ours")                     // ajout de la class ours à la section
main.appendChild(section);           // cette section est un enfant de main => définir sa position html


let ours = document.getElementsByClassName("ours");      //récupération de l'element class= ours
const div = document.createElement("div");              //création d'une div
div.classList.add ("ours__info")                     // ajout de la class ours__info à la div
ours.appendChild(div);           // cette div est un enfant de ours => définir sa position html