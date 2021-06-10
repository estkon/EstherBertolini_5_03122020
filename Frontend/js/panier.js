// déclaration de la variable "produitEnregistreDansLocalstorage" contient les keys et values du localstorage
// JSON.parse = conversion des données (JSON) du localstorage en objet JS
let produitEnregistreDansLocalstorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreDansLocalstorage);
// déclaration de la variable "LocalstorageTotal" contient total : value du localstorage
let LocalstorageTotal = JSON.parse(localStorage.getItem("total")); // récupération de la valeur
console.log(LocalstorageTotal);
// ----------------------AFFICHAGE DES PRODUITS DU PANIER--------------------------------------------
// selection de l'élément où sera injecter le code HTML
const positionElement = document.querySelector("#mainPanier");
console.log(positionElement);
//si le panier est vide :afficher le panier est vide
if (produitEnregistreDansLocalstorage === null || produitEnregistreDansLocalstorage == 0) {
    const panierVide = `
            <div class="panier-vide">
                    <div> Oooooop's ! <br>Votre panier est vide ... </div> 
                    <div class="produit-adopter">
                        <a href="../pages/index.html" id="btn_adopter">Retour à l'accueil</a>
                    </div>
            </div>
    
    </section>`;
    positionElement.innerHTML = panierVide;
} else {
    // si le panier n'est pas vide : afficher les produits du LocalStorage
    let structureProduitPanier = `
  <section class="ours contenu-panier">
        <h3>1. Validation de votre panier</h3>
        <table id="tableau">
                    <tbody>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                        <th>Retirer</th>   
  ` ;
    //mise en place de la boucle
    for (k = 0; k < produitEnregistreDansLocalstorage.length; k++) {
        //prix en fonction de la quantité
        let prixQuantite = `${produitEnregistreDansLocalstorage[k].price}` * `${produitEnregistreDansLocalstorage[k].optionQuantite}`;

        structureProduitPanier = structureProduitPanier +
            `                 
                    <tr>
                         <td >
                            <div class="contenu-panier__text">
                                 <p class="contenu-panier__text--nom">${produitEnregistreDansLocalstorage[k].name}</p>
                                 <p class="contenu-panier__text--color">${produitEnregistreDansLocalstorage[k].optionCouleur}</p>
                                 
                             </div>
                         </td>
                         <td>
                         <div id="optionQuantite">
                            <button  class="btnMore" data-id="${produitEnregistreDansLocalstorage[k].id_ProduitSelectionner}" data-color="${produitEnregistreDansLocalstorage[k].optionCouleur.split(" ").join("")}"><i class="fas fa-plus-circle"></i></button>
                            <div class="valueQuantity Quantity${produitEnregistreDansLocalstorage[k].id_ProduitSelectionner}${produitEnregistreDansLocalstorage[k].optionCouleur.split(" ").join("")}">${produitEnregistreDansLocalstorage[k].optionQuantite}</div>
                            <button  class="btnLess" data-id="${produitEnregistreDansLocalstorage[k].id_ProduitSelectionner}" data-color="${produitEnregistreDansLocalstorage[k].optionCouleur.split(" ").join("")}"><i class="fas fa-minus-circle"></i></button>
                        </div>
                         </td>
                         <td>${produitEnregistreDansLocalstorage[k].price} €</td>
                         <td data-prix="${produitEnregistreDansLocalstorage[k].price}"class="prixQuantite prixQuantity${produitEnregistreDansLocalstorage[k].id_ProduitSelectionner}${produitEnregistreDansLocalstorage[k].optionCouleur.split(" ").join("")}">${prixQuantite} €</td>
                         <td><button class="supprimer"><i class="fas fa-times-circle"></i></button></td>
                     </tr>  
                         
  
  ` ;
    }

    structureProduitPanier += ` 
<tr>
<td colspan="3" ><p class="total">Total des produits (TTC)</p</td>
<td colspan="2"><p class="totalPanier">${LocalstorageTotal} €</p> </td>
</tr>
<tr> 
<td colspan="5"><button class="btn_vider_panier"> Vider le panier </button> <td> </tr>  
</table>    
           
 </section> 
<section class="ours contenu-panier">
        <h3>2.Formulaire de commande </h3>
            <form method="post">
                <div class="input">
                    <p>
                        <label for="prenom">Votre prénom </label><span id="erreurPrenom"></span>
                        <input type="text" name="Prenom" id="prenom" placeholder="Louise"/>
                    </p>
                    <p>
                        <label for="nom">Votre nom </label><span id="erreurNom"></span>
                        <input type="text" name="Nom" id="nom" placeholder="Dupuis"/>
                    </p>
                </div>
                <div class="input">
                    <p class="adresse">
                        <label for="adresse">Votre adresse </label><span id="erreurAdresse"></span>
                        <input type="text" name="adresse" id="adresse" placeholder="5 chemin des prés"/>
                    </p>
                </div>
                    <div class="input">
                    <p>
                        <label for="code postal">Code Postal</label><span id="erreurCodePostal"></span>
                        <input type="text" name="code Postal" id="codePostal" placeholder="69000"/>
                    </p>
                    <p>
                        <label for="ville">Votre ville</label><span id="erreurVille"></span>
                        <input type="text" name="ville" id="ville" placeholder="Lyon"/>
                    </p>
                </div>
                <div class ="input ">
                    <p class="mail">
                        <label for="email">Votre email</label><span id="erreurEmail"></span>
                        <input type="text" name="email" id="email" placeholder="louise.dupuis@gmail.com"/>
                    </p>
                </div>
            </form> 
            <div class="produit-adopter">
                <a href="../pages/confirmation.html" id="btn_commander">Commander</a>
            </div>
 </section>
`
    if (k === produitEnregistreDansLocalstorage.length) {
        //injection html dans le panier
        positionElement.innerHTML = structureProduitPanier;
        ////-------------------------------BOUTONS + et - -----------------------------
        //   Les boutons + et -
        const btn_plus = document.querySelectorAll(".btnMore");
        const btn_moins = document.querySelectorAll(".btnLess");

        console.log(btn_plus);
        console.log(btn_moins);


        //Ecouter les boutons +
        btn_plus.forEach(btn => {
            btn.addEventListener("click", function () {
                console.log(this.dataset.id)
                console.log(this.dataset.color)
                let colorProduit = this.dataset.color;
                let idProduit = this.dataset.id;
                let prixQuantite = document.querySelector(`.prixQuantity${idProduit}${colorProduit}`)
                let prixProduit = prixQuantite.dataset.prix;
                let nouveauTableau = [];
                produitEnregistreDansLocalstorage.map(produit => {
                    if (produit.id_ProduitSelectionner == idProduit && produit.optionCouleur.split(" ").join("") == colorProduit) {
                        produit.optionQuantite++ // modification
                        nouveauTableau.push(produit) // envoie des modifications dans nouveau tableau
                    } else {
                        nouveauTableau.push(produit)
                    }
                    //donne l'index du produit et verifie si égal à celui du dernier produit du tableau:
                    if (produitEnregistreDansLocalstorage.indexOf(produit) == produitEnregistreDansLocalstorage.length - 1) {
                        localStorage.setItem("produit", JSON.stringify(nouveauTableau));
                    }
                
                })
                let showQuantity = document.querySelector(".Quantity" + idProduit + colorProduit) // recherche de l'élément html qui contient Quantity+id
                showQuantity.innerHTML = showQuantity.innerHTML * 1 + 1; // envoi dans html de la nouvelle valeur
                prixQuantite.innerHTML = prixProduit*showQuantity.innerHTML + "€"
                
                obtenirTotalPanier();
            })



        })



        //  //Ecouter les boutons -
        btn_moins.forEach(btn => {
            btn.addEventListener("click", function () {
                console.log(this.dataset.id)
                console.log(this.dataset.color)
                let colorProduit = this.dataset.color;
                let idProduit = this.dataset.id;
                let prixQuantite = document.querySelector(`.prixQuantity${idProduit}${colorProduit}`)
                let prixProduit = prixQuantite.dataset.prix;
                let nouveauTableau = [];
                produitEnregistreDansLocalstorage.map(produit => {
                    if (produit.id_ProduitSelectionner == idProduit && produit.optionCouleur.split(" ").join("") == colorProduit) {
                        if (produit.optionQuantite > 1) {
                            produit.optionQuantite--  // modification
                            let showQuantity = document.querySelector(".Quantity" + idProduit + colorProduit) // recherche de l'élément html qui contient Quantity+id
                            showQuantity.innerHTML = showQuantity.innerHTML * 1 - 1; // envoi dans html de la nouvelle valeur
                            let LocalstorageTotal = JSON.parse(localStorage.getItem("total")); // récupération de la valeur
                            console.log(LocalstorageTotal);
                            //rechargement de la page
                            window.location.href = "panier.html";
                        }
                        nouveauTableau.push(produit) // envoie des modifications dans nouveau tableau
                    } else {
                        nouveauTableau.push(produit)
                    }
                    //donne l'index du produit et verifie si égal à celui du dernier produit du tableau:
                    if (produitEnregistreDansLocalstorage.indexOf(produit) == produitEnregistreDansLocalstorage.length - 1) {
                        localStorage.setItem("produit", JSON.stringify(nouveauTableau));
                    }
                    
                })
                obtenirTotalPanier();
            })

        })
    }
}

// -----------------------------suppression articles par les boutons-------------------------------------------
//Selection de tous les boutons supprimer
let btn_supprimer = document.querySelectorAll(".supprimer");
console.log(btn_supprimer);

for (let l = 0; l < btn_supprimer.length; l++) {
    btn_supprimer[l].addEventListener("click", (event) => {
        event.preventDefault();
        // selection de l'id et de la couleur du produit à supprimer
        let produit_suppression = produitEnregistreDansLocalstorage[l].id_ProduitSelectionner + produitEnregistreDansLocalstorage[l].optionCouleur.split(" ").join("");
       

        // // Utilisation de la méthode filter : selection des éléments à garder et suppression de l'élément où je clique
        produitEnregistreDansLocalstorage = produitEnregistreDansLocalstorage.filter(element => element.id_ProduitSelectionner + element.optionCouleur.split(" ").join("")  !== produit_suppression ); // le ! inverse la selection
        // j'obtiens dans tous les produit sauf celui selectionner

        localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalstorage));
        // alerte: produit supprimer et rechargement de la page
        alert("le produit a bien été supprimé du panier")

        window.location.href = "panier.html";
    })

}


// //-------------------Mise en fonction du bouton vider-panier--------------------------------
// selection du bouton  class="btn_vider_panier"
const btn_vider_panier = document.querySelector(".btn_vider_panier");
console.log(btn_vider_panier);

//suppression de la key produit du local storage
btn_vider_panier.addEventListener("click", (event) => {
    event.preventDefault();
    //.removeItem pour vider le local storage
    localStorage.removeItem("produit");
    //alerte :panier supprimé
    alert("Tous vos produits ont été supprimé du panier")
    //reactualisation de la page
    window.location.href = "panier.html"


})
//------------------------ Calcul du Prix Total du panier------------------
// déclaration de la variable qui contient tous les Totaux des produits

function obtenirTotalPanier(){
let totaux = 0;
// chercher les prix du panier
const prixQuantite = document.querySelectorAll("td.prixQuantite");// récupération des éléements :td
prixQuantite.forEach(element => { //parcourir dans le tableau priquantite les elements td
    let price = element.innerHTML.split(" "); // price = td.inner HTML sans espace 
    let priceNumeric = parseInt(price[0]); // ne garder que la valeur numéric
    console.log(priceNumeric);
    totaux += priceNumeric; // addition des valeurs 
    // envoi dans le local storage de la valeur total
    localStorage.setItem("total", JSON.stringify(totaux));
    document.querySelector(".totalPanier").innerHTML = totaux + " €";
});
}
obtenirTotalPanier();


//---------------------------Soumettre les valeurs du formulaire-------------------------------
//-----selection du bouton commander-----------------
const btnCommander = document.querySelector("#btn_commander");
//-----ecoute du bouton commander--------------------
btnCommander.addEventListener("click",(event)=>{
    event.preventDefault();
    
    //recupération valeur formulaire
    const formulaire = {
        prenom: document.querySelector("#prenom").value,
        nom: document.querySelector("#nom").value,
        adresse: document.querySelector("#adresse").value,
        codepostal: document.querySelector("#codePostal").value,
        ville: document.querySelector("#ville").value,
        email: document.querySelector("#email").value
    }

//***********************************VERIFICATION CHAMPS FORMULAIRE *****************************************
//Les Alertes
const alertName = (value) => {
    return `${value}: Erreur ce champs ne doit pas contenir de chiffres ou caractères spéciaux \n Les caractères doivent être compris entre 3 et 20` ;
}

const alertCodePostal = (value) => {
    return `${value}: Erreur ce champs ne peut contenir uniquement 5 chiffres` ;
}

const alertEmail = (value) => {
    return `${value}: Erreur L'adresse mail saisie est invalide` ;
}

const alertAdress= (value) => {
    return `${value}: Erreur L'adresse saisie est incorrecte` ;
}
//les regEx

const regExName = (value) => {
    return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/.test(value);
}

const regExCodePostal = (value) => {
    return /^[0-9]{5}$/.test(value);
}

const regExEmail = (value) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

const regExAdress = (value) => {
    return /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/.test(value); // \s : permet d'autoriser les espaces
}
//les fonctions
function fornameCheck(){
//vérification de la validite prénom
const forname = formulaire.prenom;
    if(regExName(forname)){
        document.querySelector("#erreurPrenom").textContent ="";
        return true ;
    }else{
        document.querySelector("#erreurPrenom").textContent ="Ce champ comporte une erreur";
        alert(alertName("PRENOM"));       
         return false ;
        
    }
};

function lastnameCheck(){
    //vérification de la validite Nom
    const lastname = formulaire.nom;
        if(regExName(lastname)){
            document.querySelector("#erreurNom").textContent ="";
            return true ;
        }else{
            document.querySelector("#erreurNom").textContent ="Ce champ comporte une erreur";
            alert(alertName("NOM"));
            return false ;
            
        }
    };

function cityCheck(){
    //vérification de la validite Ville
    const city = formulaire.ville;
        if(regExName(city)){
            document.querySelector("#erreurVille").textContent ="";
            return true ;
        }else{
            document.querySelector("#erreurVille").textContent ="Ce champ comporte une erreur";
            alert(alertName("VILLE"));
            return false ;
            
        }
    };

function codePostalCheck(){
    //vérification de la validite Code postal
    const codePostal = formulaire.codepostal;
        if(regExCodePostal(codePostal)){
            document.querySelector("#erreurCodePostal").textContent ="";
            return true ;
        }else{
            document.querySelector("#erreurCodePostal").textContent ="Ce champ comporte une erreur";
            alert(alertCodePostal("CODE POSTAL"));
            return false ;
            
        }
    };

function emailCheck(){
    //vérification de la validite email
    const email = formulaire.email;
        if(regExEmail(email)){
            document.querySelector("#erreurEmail").textContent ="";
            return true ;
        }else{
            document.querySelector("#erreurEmail").textContent ="Ce champ comporte une erreur";
            alert(alertEmail("EMAIL"));
            return false ;
            
        }
    };

function adressCheck(){
    //vérification de la validite adresse
    const adress = formulaire.adresse;
        if(regExAdress(adress)){
            document.querySelector("#erreurAdresse").textContent ="";
            return true ;
        }else{
            document.querySelector("#erreurAdresse").textContent ="Ce champ comporte une erreur";
            alert(alertAdress("ADRESSE"));
            return false ;
            
        }
    };

function orderConfirm(){
        //récupération des id des produits dans un tableau
    let productsTab = [];
    produitEnregistreDansLocalstorage.map(produit => {
        if (produit.id_ProduitSelectionner ) {
            productsTab.push(produit.id_ProduitSelectionner) // envoie des modifications dans nouveau tableau
        } else {
            productsTab.push(produit.id_ProduitSelectionner)
        }
    
    })

    // mettre les produits du panier et le formulaire dans un objet "order" à envoyer au serveur
    const order = {
        contact: {
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value,
        },
    
        products:  productsTab ,
    }
    console.log("order");
    console.log(order);

    //Envoi de l'objet "order" vers le server
    //fonction paramètres de la requête
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }

   // Envoi au server
   fetch('http://localhost:3000/api/teddies/order', requestOptions)
   .then((response) => response.json())
   .then((data) => {
       window.location.href = `confirmation.html?orderId=${data.orderId}`
       // window.location.href = `${window.location.href}/confirmation.html?orderId=${data.orderId}`
   })
   .catch(() => {
       alert(error)
   })
}

// Contrôle de la validité du formulaire et envoi dans localstorage
if(fornameCheck()  && lastnameCheck() && cityCheck() && codePostalCheck() && emailCheck() && adressCheck()){
    //-----------------------------------------------------------------------------------------------------------------
    orderConfirm();

    // mettre l'objet formulaire dans le localStorage
    localStorage.setItem("formulaire",JSON.stringify(formulaire));
    
    

}else{
    alert("Formulaire incorrect \n Veuillez vérifier vos champs de saisie");

};

   
});
// Contrôle de la validité du formulaire et envoi dans localstorage


// //-------------------Remplir le formulaire avec les valeurs du localstorage automatiquement --------------
// //Récupération de la key "formulaire" et la mettre dans une variable
const keyformulaire = JSON.parse(localStorage.getItem("formulaire"));
console.log("keyformulaire");
console.log(keyformulaire);



// // mettre les valeurs du local storage dans les champs formulaire
document.querySelector("#nom").setAttribute("value", keyformulaire.nom);
document.querySelector("#prenom").setAttribute("value", keyformulaire.prenom);
document.querySelector("#adresse").setAttribute("value", keyformulaire.adresse);
document.querySelector("#codePostal").setAttribute("value", keyformulaire.codepostal);
document.querySelector("#ville").setAttribute("value", keyformulaire.ville);
document.querySelector("#email").setAttribute("value", keyformulaire.email);




