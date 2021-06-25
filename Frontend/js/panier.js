let productInStorage = JSON.parse(localStorage.getItem('produit'))
let LocalstorageTotal = JSON.parse(localStorage.getItem("total"));
const positionElement = document.querySelector("#mainPanier");
if (productInStorage === null || productInStorage == 0) {
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
    for (k = 0; k < productInStorage.length; k++) {
        let prixQuantite = `${productInStorage[k].price}` * `${productInStorage[k].optionQuantite}`;
        structureProduitPanier = structureProduitPanier +
            `                 
                    <tr>
                         <td >
                            <div class="contenu-panier__text">
                                 <p class="contenu-panier__text--nom">${productInStorage[k].name}</p>
                                 <p class="contenu-panier__text--color">${productInStorage[k].optionCouleur}</p>
                                 
                             </div>
                         </td>
                         <td>
                         <div id="optionQuantite">
                            <button  class="btnMore"  data-id="${productInStorage[k].id_ProduitSelectionner}" data-color="${productInStorage[k].optionCouleur.split(" ").join("")}"><i class="fas fa-plus-circle"></i></button>
                            <div class="valueQuantity Quantity${productInStorage[k].id_ProduitSelectionner}${productInStorage[k].optionCouleur.split(" ").join("")}">${productInStorage[k].optionQuantite}</div>
                            <button  class="btnLess"  data-id="${productInStorage[k].id_ProduitSelectionner}" data-color="${productInStorage[k].optionCouleur.split(" ").join("")}"><i class="fas fa-minus-circle"></i></button>
                        </div>
                         </td>
                         <td>${productInStorage[k].price} €</td>
                         <td data-prix="${productInStorage[k].price}"class="prixQuantite prixQuantity${productInStorage[k].id_ProduitSelectionner}${productInStorage[k].optionCouleur.split(" ").join("")}">${prixQuantite} €</td>
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
                    <div>
                        <label for="prenom">Votre prénom </label><span id="erreurPrenom"></span>
                        <input type="text" name="Prenom" id="prenom" class="form-input" placeholder="Louise"/>
                    </div>
                    <div>
                        <label for="nom">Votre nom </label><span id="erreurNom"></span>
                        <input type="text" name="Nom" id="nom" class="form-input" placeholder="Dupuis"/>
                    </div>
                </div>
                <div class="input">
                    <div class="adresse">
                        <label for="adresse">Votre adresse </label><span id="erreurAdresse"></span>
                        <input type="text" name="adresse" id="adresse" class="form-input"placeholder="5 chemin des prés"/>
                    </div>
                </div>
                    <div class="input">
                    <div>
                        <label for="code postal">Code Postal</label><span id="erreurCodePostal"></span>
                        <input type="text" name="code_postal" id="codePostal" class="form-input" placeholder="69000"/>
                    </div>
                    <div>
                        <label for="ville">Votre ville</label><span id="erreurVille"></span>
                        <input type="text" name="ville" id="ville" class="form-input" placeholder="Lyon"/>
                    </div>
                </div>
                <div class ="input ">
                    <div class="mail">
                        <label for="email">Votre email</label><span id="erreurEmail"></span>
                        <input type="text" name="email" id="email" class="form-input" placeholder="louise.dupuis@gmail.com"/>
                    </div>
                </div>
                </form> 
                <div class="produit-adopter">
                        <button type="submit" id="btn_commander">Commander</button>
                </div>
                </section>
                `;
    positionElement.innerHTML = structureProduitPanier;
}
//injection html dans le panier
////-------------------------------BOUTONS + et - -----------------------------
//   Les boutons + et -

const btn_plus = document.querySelectorAll(".btnMore");
const btn_moins = document.querySelectorAll(".btnLess");
btn_plus.forEach(btn => btn.addEventListener('click', function () { adjustProductQuantity(this, 'plus') }))
btn_moins.forEach(btn => btn.addEventListener('click', function () { adjustProductQuantity(this, 'moins') }))

function adjustProductQuantity(btn, type) {

    if(type == 'plus'){
        console.log(productInStorage)
        productInStorage = productInStorage.map(p => {
            if (p.id_ProduitSelectionner == btn.dataset.id && p.optionCouleur.split(" ").join("") == btn.dataset.color) {
                p.optionQuantite++
                btn.parentNode.querySelector('.valueQuantity').innerHTML = p.optionQuantite
                return p
            }else{
                return p
            }
        })

    obtenirTotalPanier();
    }else{
        productInStorage = productInStorage.map(p => {
            if (p.id_ProduitSelectionner == btn.dataset.id && p.optionCouleur.split(" ").join("") == btn.dataset.color && p.optionQuantite > 1) {
                p.optionQuantite--
                btn.parentNode.querySelector('.valueQuantity').innerHTML = p.optionQuantite
                return p
            }else{
                return p
            }
        })

    obtenirTotalPanier();

    }

    localStorage.setItem('produit', JSON.stringify(productInStorage))
    window.location.reload() // recharger la page pour calculer le prix total et pris des produit 
    obtenirTotalPanier();
}

// -----------------------------suppression articles par les boutons-------------------------------------------
//Selection de tous les boutons supprimer
let btn_supprimer = document.querySelectorAll(".supprimer");
console.log(btn_supprimer);

for (let l = 0; l < btn_supprimer.length; l++) {
    btn_supprimer[l].addEventListener("click", (event) => {
        event.preventDefault();
        // selection de l'id et de la couleur du produit à supprimer
        let produit_suppression = productInStorage[l].id_ProduitSelectionner + productInStorage[l].optionCouleur.split(" ").join("");


        // // Utilisation de la méthode filter : selection des éléments à garder et suppression de l'élément où je clique
        productInStorage = productInStorage.filter(element => element.id_ProduitSelectionner + element.optionCouleur.split(" ").join("") !== produit_suppression); // le ! inverse la selection
        // j'obtiens dans tous les produit sauf celui selectionner

        localStorage.setItem("produit", JSON.stringify(productInStorage));
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

function obtenirTotalPanier() {
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


//******************************** FORMULIARE ****************************************************************
//-----selection du bouton commander-----------------
const btnCommander = document.querySelector("#btn_commander");

//-----ecoute du bouton commander--------------------
btnCommander.addEventListener("click", (event) => {
    event.preventDefault();
    erreur = 0 //nombre d'erreurs au depart
    document.querySelectorAll('.form-input').forEach(i =>  {
        checkRegexValue(i) ? erreur++ : null // si l'input n'est pas valide on incriment le nombre d'erreurs sion on fais rien
    })
    if (erreur) {
        // il y'a des erreur on envoie pas le fetch
        console.log(erreur)
    } else {

        //pas d'erreur on envoie le fetch
        orderConfirm()
        console.log("pas d'erreur ")
    }
})

let regexs = { // list des regexes de chaque input
    email: { // le nom de l'input exemple <input type="email" name="email" > c'est ne name="" qu'on utilise
        regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, // la regex
        erreurContainer: "erreurEmail", // le span qui recevera l'erreur 
        erreur: "Erreur L'adresse mail saisie est invalide" // l'erreur a afficher 
    },
    Nom: { // le nom de l'input exemple <input type="email" name="email" > c'est ne name="" qu'on utilise
        regex: /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/, // la regex
        erreurContainer: "erreurNom", // le span qui recevera l'erreur 
        erreur: "Erreur Le nom saisi est invalide" // l'erreur a afficher 
    },
    Prenom: { // le nom de l'input exemple <input type="email" name="email" > c'est ne name="" qu'on utilise
        regex: /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/, // la regex
        erreurContainer: "erreurPrenom", // le span qui recevera l'erreur 
        erreur: "Erreur Le prenom saisi est invalide" // l'erreur a afficher 
    },
    adresse: { // le nom de l'input exemple <input type="email" name="email" > c'est ne name="" qu'on utilise
        regex: /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/, // \s : permet d'autoriser les espaces, // la regex
        erreurContainer: "erreurAdresse", // le span qui recevera l'erreur 
        erreur: "Erreur L'adresse saisie est invalide" // l'erreur a afficher 
    },
    ville: { // le nom de l'input exemple <input type="email" name="email" > c'est ne name="" qu'on utilise
        regex: /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/, // la regex
        erreurContainer: "erreurVille", // le span qui recevera l'erreur 
        erreur: "Erreur La ville saisie est invalide" // l'erreur a afficher 
    },
    code_postal: { // le nom de l'input exemple <input type="email" name="email" > c'est ne name="" qu'on utilise
        regex: /^[0-9]{5}$/, // la regex
        erreurContainer: "erreurCodePostal", // le span qui recevera l'erreur 
        erreur: "Erreur Le code postal saisi est invalide" // l'erreur a afficher 
    }
}

/**
 * 
 * @param {HTMLInput} input prend un element input en params
 * @returns true si la value de l' input n'est pas valide 
 * @returns false si la value de l' input est valide 
 */


function checkRegexValue(input) {
    let inputName = input.getAttribute('name') //input name = input avec attribut name
    let elementToTest = regexs[inputName]
    if (!elementToTest.regex.test(input.value)) {
        document.querySelector(`#${elementToTest.erreurContainer}`).innerHTML = elementToTest.erreur
        return true
    }
    return false
}
/**----**/

function orderConfirm() {
    //récupération des id des produits dans un tableau
    let productsTab = [];
    
    productInStorage.map(produit => {
        if (produit.id_ProduitSelectionner) {
            productsTab.push(produit.id_ProduitSelectionner) // envoie des modifications dans nouveau tableau
        } else {
            productsTab.push(produit.id_ProduitSelectionner)
        }

    })

    // mettre les produits du panier et le formulaire dans un objet "order" à envoyer au serveur
    const order = {
        contact: {
            firstName: document.querySelector("#prenom").value,
            lastName: document.querySelector("#nom").value,
            address: document.querySelector("#adresse").value,
            city: document.querySelector("#ville").value,
            email: document.querySelector("#email").value
        },

        products: productsTab,
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
            localStorage.setItem('contact', JSON.stringify(order.contact))
            window.location.href = `confirmation.html?orderId=${data.orderId}`
            // window.location.href = `${window.location.href}/confirmation.html?orderId=${data.orderId}`
        })
        .catch((error) => {
            alert(error)
        })
}
// Contrôle de la validité du formulaire et envoi dans localstorage


// //-------------------Remplir le formulaire avec les valeurs du localstorage automatiquement --------------
// //Récupération de la key "formulaire" et la mettre dans une variable
const keyformulaire = JSON.parse(localStorage.getItem("formulaire"));
console.log("keyformulaire");
console.log(keyformulaire);