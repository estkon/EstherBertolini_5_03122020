// lien vers API
let content = ''
let main = document.getElementById("mainConfirmation");  
fetch("http://localhost:3000/api/teddies/${idProduitSelectionner}")
.then(res => res.json())
.then (data => {
    data.forEach(ours =>{
    content= 
    ` <section class="Thanks">
            <p class="violet">
            Nous vous remercions pour votre achat sur Ornibear by Ornico !
            </p>
            <p class="orange">
            Vous retrouverez ci-après un récapitulatif de votre commande.
            </p>
            <p class="violet">à bientôt !</p>
    </section>

    <section class="recapitulatif">
        <h3>2. Récapitulatif de commande</h3>
        <p>Identifiant de commande: XYZ36</p>
        <p>Montant de la commande: 48€</p>
    </section>
`
})
mainConfirmation.innerHTML = content

})
.catch(err => console.log(err));