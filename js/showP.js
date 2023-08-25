let prix = 0;
let dataMemeCategorie = [];
const produitDeMemeCategorie = document.getElementById(
  "produitDeMemeCategorie"
);
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

// fetch
// Récupérer les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

// Charger le fichier JSON
fetch("/js/produits.json")
  .then((response) => response.json())
  .then((produits) => {
    const produitTrouve = produits.find((produit) => produit.id === id);
    if (produitTrouve) {
      produits.forEach((produit) => {
        if (
          produit.categorie === produitTrouve.categorie
          //&& produit.id != produitTrouve.id
        ) {
          dataMemeCategorie.push(produit);
        }
      });
      for (let i = 0; i < 4; i++) {
        if (dataMemeCategorie.length == i) {
          break;
        }
        cardComposant(produitDeMemeCategorie, dataMemeCategorie, i);
      }
      // Mettre à jour les éléments HTML avec les données du produit
      document.getElementById("productImage").src = produitTrouve.image;
      document.getElementById("productTitle").textContent = produitTrouve.nom;
      document.getElementById("productDescription").textContent =
        produitTrouve.description;
      document.getElementById(
        "productPrice"
      ).textContent = `${produitTrouve.prix}Ar`;
      prix = produitTrouve.prix;
    } else {
      console.log("Produit non trouvé");
    }
  });

//plus , minus
var minusButtons = document.querySelectorAll(".minus");
var plusButtons = document.querySelectorAll(".plus");
var NombreButtons = document.querySelector("#Nombre");

minusButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var input = this.parentElement.querySelector("input");
    var count = parseInt(input.value) - 1;
    count = count < 1 ? 1 : count;
    input.value = count;
    input.dispatchEvent(new Event("change"));
    document.getElementById("productPrice").textContent = `${
      prix * input.value
    }Ar`;
    return false;
  });
});

plusButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var input = this.parentElement.querySelector("input");
    input.value = parseInt(input.value) + 1;
    input.dispatchEvent(new Event("change"));
    document.getElementById("productPrice").textContent = `${
      prix * input.value
    }Ar`;
    return false;
  });
});

NombreButtons.addEventListener("change", function () {
  if (this.value < 1) {
    this.value = 1;
  }
  document.getElementById("productPrice").textContent = `${
    prix * this.value
  }Ar`;
  return false;
});

//toogle
let toogle = false;
document.getElementById("btnD").addEventListener("click", () => {
  if (!toogle) {
    if (dataMemeCategorie.length > 4) {
      for (let i = 4; i < dataMemeCategorie.length; i++) {
        cardComposant(produitDeMemeCategorie, dataMemeCategorie, i);
      }
    }
    toogle = true;
  } else {
    document.querySelectorAll(".elementE").forEach((element, index) => {
      if (index > 3) {
        element.remove();
      }
    });
    toogle = false;
  }
});
