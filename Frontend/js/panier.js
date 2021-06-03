// déclaration de la variable "produitEnregistreDansLocalstorage" contient les keys et values du localstorage
// JSON.parse = conversion des données (JSON) du localstorage en objet JS
let produitEnregistreDansLocalstorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreDansLocalstorage);
// déclaration de la variable "LocalstorageTotal" contient les keys et values du localstorage
// JSON.parse = conversion des données (JSON) du localstorage en objet JS
let LocalstorageTotal = JSON.parse(localStorage.getItem("total"));
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
    </div>`;
    positionElement.innerHTML = panierVide;
} else {
    // si le panier n'est pas vide : afficher les produits du LocalStorage
    let structureProduitPanier = `
  <section class="contenu-panier">
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
                                 <p class="contenu-panier__text--ref">ref=${produitEnregistreDansLocalstorage[k].id_ProduitSelectionner}</p>
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
                         <td class="prixQuantite">${prixQuantite} €</td>
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

                //rechargement de la page pour calcul du prix en fonction de la quantite
                window.location.href = "panier.html";

            })



        })



        //  //Ecouter les boutons -
        btn_moins.forEach(btn => {
            btn.addEventListener("click", function () {
                console.log(this.dataset.id)
                console.log(this.dataset.color)
                let colorProduit = this.dataset.color;
                let idProduit = this.dataset.id;
                let nouveauTableau = [];
                produitEnregistreDansLocalstorage.map(produit => {
                    if (produit.id_ProduitSelectionner == idProduit && produit.optionCouleur == colorProduit) {
                        if (produit.optionQuantite > 1) {
                            produit.optionQuantite--  // modification
                            let showQuantity = document.querySelector(".Quantity" + idProduit + colorProduit) // recherche de l'élément html qui contient Quantity+id
                            showQuantity.innerHTML = showQuantity.innerHTML * 1 - 1; // envoi dans html de la nouvelle valeur
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
        let produit_suppression = produitEnregistreDansLocalstorage[l].id_ProduitSelectionner + produitEnregistreDansLocalstorage[l].optionCouleur;
        console.log(produit_suppression);

        // Utilisation de la méthode filter : selection des éléments à garder et suppression de l'élément où je clique
        produitEnregistreDansLocalstorage = produitEnregistreDansLocalstorage.filter(element => element.id_ProduitSelectionner + element.optionCouleur !== produit_suppression); // le ! inverse la selection
        console.log(produitEnregistreDansLocalstorage);
        // envoie de la variable dans le localStorage
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
let totaux = 0;
// chercher les prix du panier
const prixQuantite = document.querySelectorAll("td.prixQuantite");// récupération des éléements :td
prixQuantite.forEach(element => { //parcourir dans le tableau priquantite les elements td
    let price = element.innerHTML.split(" "); // price = td.inner HTML sans espace 
    let priceNumeric = parseInt(price[0]); // ne garder que la valeur numéric
    console.log(priceNumeric);
    totaux += priceNumeric; // addition des valeurs 
    // récupération dans le local storage de la valeur total
    localStorage.setItem( "total", JSON.stringify(totaux));

});
console.log(totaux); 




 





