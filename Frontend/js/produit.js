// //récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;

// // méthode 1 supprimer "?" pour récupérer uniquement id
// const monId = queryString_url_id.slice(1);
// console.log(monId)

// méthode 2 pour récupérer uniquement id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const idProduitSelectionner = urlSearchParams.get("id")


// lien vers API
let content = ''
let main = document.getElementById("mainProduit");  
fetch(`http://localhost:3000/api/teddies/${idProduitSelectionner}`)
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
            <p class="ours__texte--prix">${ours.price /100} €</p>
        </div>
    </div>
    <div class="ours__texte--boutons">
              <div id="optionQuantite">
              <button id="btnMore"><i class="fas fa-plus-circle"></i></button>
              <div id= valueQuantity>1</div>
              <button  id="btnLess"><i class="fas fa-minus-circle"></i></button>
              `
      ;


   content += ` </div>  
              
              <select id="optionCouleur">
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
    <a href="../pages/panier.html" id="btn_adopter">L’adopter</a>
</div>
</section>
`
mainProduit.innerHTML = content

////-------------------------------BOUTONS + et - -----------------------------
//   Les boutons + et -
const btn_plus = document.querySelector("#btnMore");
const btn_moins = document.querySelector("#btnLess");
var $valueQuantity = document.querySelector("#valueQuantity");

 console.log(btn_plus);
 console.log(btn_moins);
 console.log(valueQuantity);

 //Ecouter le bouton +
btn_plus.addEventListener("click",(event)=>{
    $valueQuantity.innerHTML = parseInt($valueQuantity.innerHTML) + 1
});

 //Ecouter le bouton -
 btn_moins.addEventListener("click",(event)=>{
    var $valueQuantity = document.querySelector("#valueQuantity");
    if(parseInt($valueQuantity.innerHTML) > 1 ) {
    $valueQuantity.innerHTML = parseInt($valueQuantity.innerHTML) - 1
}

});
 


// ---------------------la gestion du panier---------------------------------------
//--la récupération des données selctionnées par l'utilisateur et envoi du panier--

// selection de l'id de la couleur et quantité
const idColor = document.querySelector("#optionCouleur")
const idQuantity = document.querySelector("#optionQuantite")

//----------------------------ADOPTER--------------------------------------------
// Selection du bouton l'adopter
const btn_adopter = document.querySelector("#btn_adopter");

console.log(btn_adopter);


//Ecouter le bouton et envoyer le panier
btn_adopter.addEventListener("click",(event)=> {
event.preventDefault();


//mettre le choix de l'utilisateur dans une variable
const choixCouleur = idColor.value;
const choixQuantite = $valueQuantity.innerHTML;


//récupération des valeurs du formulaire

let optionsProduit ={
    name: ours.name ,
    id_ProduitSelectionner : ours._id ,
    optionCouleur : choixCouleur ,
    optionQuantite : choixQuantite ,
    price : ours.price / 100 ,
};
console.log(optionsProduit);


// ---------------------le local Storage---------------------------------------
//--Stocker la récupération des valeurs du produit choisi dans le localstorage--

// déclaration de la variable "produitEnregistreDansLocalstorage" contient les keys et values du localstorage
// JSON.parse = conversion des données (JSON) du localstorage en objet JS
let produitEnregistreDansLocalstorage = JSON.parse(localStorage.getItem("produit"));

//fonction fenêtre popup
const popoupConfirmation = () =>{
    if(window.confirm(`${ours.name} couleur:${choixCouleur} quantité:${choixQuantite} ajouté au panier
consulter le panier OK ou revenir à la page d'accueil ANNULER`)){
        window.location.href ="panier.html";

    }else{
        window.location.href ="index.html";

    }
}
//fonction ajouter un produit selectionné dans le localStorage
const ajoutProduitLocalStorage = () =>{
    produitEnregistreDansLocalstorage.push(optionsProduit);
    localStorage.setItem("produit",JSON.stringify(produitEnregistreDansLocalstorage));
}

//Si il y a des produits déjà enregistrés dans le localstorage
if(produitEnregistreDansLocalstorage){
    ajoutProduitLocalStorage();
    popoupConfirmation();
}
 //Si il n'y a pas de produits déjà enregistrés dans le localstorage
else{
    produitEnregistreDansLocalstorage = [] ;
    ajoutProduitLocalStorage();
    popoupConfirmation();
    
}

});




})
.catch(err => console.log(err));