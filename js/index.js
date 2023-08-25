let data = [];
let cardComposant = (parentF, produit, index) => {
  const carteProduit = document.createElement("a");
  carteProduit.href = `/otherPage/showProduit.html?id=${produit[index].id}`;
  carteProduit.classList.add(
    "card",
    "bg-white",
    "border-0",
    "col-6",
    "col-lg-2",
    "elementE"
  );

  const imageProduit = document.createElement("img");
  imageProduit.classList.add("card-img-top");
  imageProduit.src = produit[index].image;
  imageProduit.alt = "Image de " + produit[index].nom;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const titreProduit = document.createElement("h5");
  titreProduit.classList.add("card-title");
  titreProduit.textContent = produit[index].nom;

  const infoProduit = document.createElement("div");
  infoProduit.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );
  const starsDiv = document.createElement("div");
  starsDiv.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );

  const starImage = document.createElement("img");
  starImage.src = "../images/star.png";
  starImage.width = 24;
  starImage.height = 24;
  starImage.alt = "";
  starImage.classList.add("me-2");
  starsDiv.appendChild(starImage);

  const etoilesProduit = document.createElement("p");
  etoilesProduit.classList.add("mb-0");
  etoilesProduit.textContent = produit[index].etoile;

  const prixProduit = document.createElement("p");
  prixProduit.classList.add("prix", "mb-0");
  prixProduit.textContent = produit[index].prix + "Ar";

  starsDiv.appendChild(etoilesProduit);
  infoProduit.appendChild(starsDiv);
  infoProduit.appendChild(prixProduit);

  cardBody.appendChild(titreProduit);
  cardBody.appendChild(infoProduit);

  carteProduit.appendChild(imageProduit);
  carteProduit.appendChild(cardBody);

  parentF.appendChild(carteProduit);
};

fetch("/js/produits.json")
  .then((response) => response.json())
  .then((produits) => {
    const conteneurProduits = document.getElementById("conteneurProduits");
    data = produits;
    for (let i = 0; i < 4; i++) {
      cardComposant(conteneurProduits, produits, i);
    }
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors du chargement du JSON :",
      error
    );
  });
