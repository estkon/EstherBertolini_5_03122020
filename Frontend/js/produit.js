// lien vers API
    let content = ''
    let main = document.getElementById("mainProduit");  
    fetch("http://localhost:3000/api/teddies/")
    .then(res => res.json())
    .then (data => {
        data.forEach(ours =>{
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
            
                <ul>
                  <li class="deroulant"><a href="#"><p>Quantité: 0 </p></a>
                    <ul class="sous">
                      <li><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                    </ul>
                  </li>
                  <li class="deroulant"><a href="#"><p>Couleur</p></a>
                    <ul class="sous">
                      <li><a href="#">${ours.colors[0]}</a></li>
                      <li><a href="#">${ours.colors[1]}</a></li>
                      <li><a href="#">${ours.colors[2]}</a></li>
                    </ul>
                  </li>
                </ul>
              
              
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
        <a href="../pages/panier.html"> <button>L’adopter</button></a>
    </div>
</section>
`
})
mainProduit.innerHTML = content

})
.catch(err => console.log(err));