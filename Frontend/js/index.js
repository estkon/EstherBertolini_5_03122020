// lien vers API
let content = ''
let main = document.getElementById("main");  
fetch("http://localhost:3000/api/teddies/")
.then(res => res.json())
.then (data => {
    data.forEach(ours =>{
    content+= 
    `<section class="ours">
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
                <div class="ours__texte--boutons">
                <a href ="../pages/produit.html?id=${ours._id}">En savoir +</a>
                </div>
            </div>

        </section>
        `
    })
    
main.innerHTML = content

})
.catch(err => console.log(err));

//fonction pour mettre les id des produits dans le localstorage