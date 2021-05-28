// déclaration de la variable "produitEnregistreDansLocalstorage" contient les keys et values du localstorage
// JSON.parse = conversion des données (JSON) du localstorage en objet JS
let produitEnregistreDansLocalstorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreDansLocalstorage);

// ----------------------AFFICHAGE DES PRODUITS DU PANIER--------------------------------------------
// selection de l'élément où sera injecter le code HTML
const positionElement = document.querySelector("#mainPanier");
console.log(positionElement);

//si le panier est vide :afficher le panier est vide
if(produitEnregistreDansLocalstorage === null){
const panierVide = `
    <div class="panier-vide">
        <div> Oooooop's ! <br>Votre panier est vide ... </div> 
    </div>`;

positionElement.innerHTML = panierVide ;

}else{
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
  for (k = 0; k < produitEnregistreDansLocalstorage.length; k ++ ){

 //prix en fonction de la quantité
 let prixQuantite = `${produitEnregistreDansLocalstorage[k].price}`*`${produitEnregistreDansLocalstorage[k].optionQuantite}`;
 
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
                         <td>${produitEnregistreDansLocalstorage[k].optionQuantite}</td>
                         <td>${produitEnregistreDansLocalstorage[k].price} €</td>
                         <td>${prixQuantite} €</td>
                         <td><button class="supprimer"><i class="fas fa-times-circle"></i></button></td>
                     </tr>          
  
  ` ;
}
//prix total : addition des prixQuantite
//création ici

structureProduitPanier += ` 
<tr>
<td colspan="3" ><p class="total">Total des produits (TTC)</p</td>
<td colspan="2">48€ </td>
</tr>
</table                  
 </section>   
`


if ( k === produitEnregistreDansLocalstorage.length){
//injection html dans le panier
positionElement.innerHTML = structureProduitPanier ;
    }

//   //-------------------------------SUPPRESSION DES ARTICLES-----------------------------
//  // Btn supprimer article //
//  const deleteItem = document.querySelectorAll(".supprimer");
//  console.log(deleteItem);

//  //ecoute des boutons supprimer
//  deleteItem.addEventListener("click",(event) =>{
//  event.preventDefault() ; 

// // selection de l'id du produit qui sera supprimer au clic sur le bouton
//  let suppressionIdSelected = produitEnregistreDansLocalstorage[k].id_ProduitSelectionner;
//   })

}

