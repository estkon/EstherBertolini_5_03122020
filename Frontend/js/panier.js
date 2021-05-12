// lien vers API
let content = ''
let main = document.getElementById("mainPanier");  
fetch("http://localhost:3000/api/teddies/")
.then(res => res.json())
.then (data => {
    data.forEach(ours =>{
    content= 
    ` <section class="contenu-panier">
    <h3>1. Validation de votre panier</h3>
         <table>
                     <tr>
                         <th>Produit</th>
                         <th>Quantité</th>
                         <th>Prix unitaire</th>
                         <th>Total</th>
                         <th>Retirer</th>
                     </tr>
                     <tr>
                         <td >
                             <div class="photo-ref">
                                     <div class="contenu-panier__img">
                                         <a href="produit.html">
                                             <img src="../public/img/teddy_1_table.jpg" alt="teddy_1">
                                         </a>
                                     </div>
                                     <div class="contenu-panier__text">
                                         <p class="contenu-panier__text--nom">Petit Ours Brun</p>
                                         <p class="contenu-panier__text--ref">ref=5632158f</p>
                                     </div>
                                 </div>
                         </td>
                         <td>1</td>
                         <td>12€</td>
                         <td>12€</td>
                         <td><i class="fas fa-times-circle"></i></td>
                     </tr>
                     <tr>
                         <td >
                                 <div class="photo-ref">
                                     <div class="contenu-panier__img">
                                         <a href="produit.html">
                                              <img src="../public/img/teddy_4_table.jpg" alt="teddy_4">
                                         </a>
                                     </div>
                                     <div class="contenu-panier__text">
                                         <p class="contenu-panier__text--nom">Frisouille</p>
                                         <p class="contenu-panier__text--ref">ref=5632158f</p>
                                     </div>
                                 </div>
                         </td>
                         <td>1</td>
                         <td>12€</td>
                         <td>12€</td>
                         <td><i class="fas fa-times-circle"></i></td>
                     </tr>
                     <tr>
                         <td >
                             <div class="photo-ref">
                                     <div class="contenu-panier__img">
                                         <a href="produit.html">
                                              <img src="../public/img/teddy_3_table.jpg" alt="teddy_3">
                                         </a>
                                     </div>
                                     <div class="contenu-panier__text">
                                         <p class="contenu-panier__text--nom">Ours & Nounours</p>
                                         <p class="contenu-panier__text--ref">ref=5632158f</p>
                                     </div>
                                 </div>
                         </td>
                         <td>1</td>
                         <td>12€</td>
                         <td>12€</td>
                         <td><i class="fas fa-times-circle"></i></td>
                     </tr>
                     
                 <tr>
                     <td colspan="3" ><p class="total">Total des produits (TTC)</p</td>
                     <td colspan="2">48€ </td>
                 </tr>
         </table>
 </section>

`
})
mainPanier.innerHTML = content

})
.catch(err => console.log(err));