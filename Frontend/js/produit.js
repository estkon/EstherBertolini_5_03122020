// //récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;

// // méthode 1 supprimer "?" pour récupérer uniquement id
// const monId = queryString_url_id.slice(1);
// console.log(monId)

// méthode 2 pour récupérer uniquement id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id")


// lien vers API
let content = ''
let main = document.getElementById("mainProduit");  
fetch(`http://localhost:3000/api/teddies/${id}`)
.then(res => res.json())
.then (ours =>{
    content= 
    ` <section class="ours">
    <div class="ours__info">
        <div class="ours__img">
            <a href="${ours.imageUrl}"
            ><img
            src="${ours.imageUrl}"
            alt="Photo de nounours"
            title="Cliquez pour agrandir"
            /></a>
        </div>
        <div class="ours__texte">
            <h3>${ours.name}</h3>
            <p class="ours__texte--description">
            ${ours.description}
            </p>
            <p class="ours__texte--prix">${ours.price} €</p>
        </div>
    </div>
    <div class="ours__texte--boutons">

              <select id="quantite">
              `
      for (let i=1 ; i<5 ; i ++) { //ajustement quantité
      content +=
      `
              <option value="${i}">${i}</option>

      `
      };
          
   content += ` </select>  
              
              <select id="colors">
    `
      ours.colors.forEach(couleur => { //cherche la couleur à afficher dans ours
      content +=
      `
              <option value="${couleur}">${couleur}</option>

      `
      });
          
   content += ` </select>        
    </div>
</div>
<div class="fiche">
    <p class="titre-underline">Fiche produit:</p>
    <p>Matière: coton bio (100%)</br>
        Taille: 12 cm</br>
        Production: Française</br>
        Norme de fabrication: Marquage CE</br>
        Convient aux enfants : dès la naissance.</p>
</div>
 <div class="produit-adopter">
    <a href="../pages/panier.html" id="adopter">L’adopter</a>
</div>
</section>
`
mainProduit.innerHTML = content

//mise des données dans le localstorage au clique sur l'adopter
let btnAdopter = document.getElementById('adopter'); //récup du boutton "l'adopter"
console.log(btnAdopter);

btnAdopter.addEventListener("click", () =>{   // écoute du clique sur "l'adopter"

// récupération des données sur l'ours
let name = document.querySelector("h3");
let picture = document.getElementsByClassName("ours__img");
let price = document.getElementsByClassName("ours__texte--prix");
// let color = document.getElementById("colors");
// let quantity = document.getElementById("quantite");



 //stocker les données saisies dans le local storage

 localStorage.setItem("name", `${ours.name}` );
 localStorage.setItem("picture", `${ours.imageUrl}` );
 localStorage.setItem("price", `${ours.price}` );
//  localStorage.setItem("color", `${couleur}` );
//  localStorage.setItem("quantity", `${i}` )



});

})
.catch(err => console.log(err));

