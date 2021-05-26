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
  <h3>1. Validation de votre panier</h3>
  <table id="tableau">
              <tbody>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                  <th>Retirer</th>
              <tr>
                
    
  ` ;
 
  //mise en place de la boucle
  for (k = 0; k < produitEnregistreDansLocalstorage.length; k ++ ){

  structureProduitPanier = structureProduitPanier +
  `                 
                     <td >
                                     <div class="contenu-panier__text">
                                         <p class="contenu-panier__text--nom">${produitEnregistreDansLocalstorage[k].name}</p>
                                          <p class="contenu-panier__text--color">${produitEnregistreDansLocalstorage[k].optionCouleur}</p>
                                         <p class="contenu-panier__text--ref">ref=${produitEnregistreDansLocalstorage[k].id_ProduitSelectionner}</p>
                                     </div>
                         </td>
                         <td>${produitEnregistreDansLocalstorage[k].optionQuantite}</td>
                         <td>${produitEnregistreDansLocalstorage[k].price /100} €</td>
                         <td>${produitEnregistreDansLocalstorage[k].price /100}*${produitEnregistreDansLocalstorage[k].optionQuantite} €</td>
                         <td><i class="fas fa-times-circle"></i></td>
                     </tr>         
                     </tbody>   
            </table>  
  
  ` ;
}


if ( k === produitEnregistreDansLocalstorage.length){
//injection html dans le panier
positionElement.innerHTML = structureProduitPanier ;
    }
}
