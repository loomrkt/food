const sLocal = document.getElementById("sLocal");
const ff = document.getElementById("ff");
const rg = document.getElementById("rg");
const me = document.getElementById("me");
let datasLocal = [];
let datasff = [];
let datasrg = [];
let datasme = [];
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
    for (let i = 0; i < produits.length; i++) {
      if (produits[i].categorie === "terroir") {
        datasLocal.push(produits[i]);
      } else if (produits[i].categorie === "fastFood") {
        datasff.push(produits[i]);
      } else if (produits[i].categorie === "regime") {
        datasrg.push(produits[i]);
      } else if (produits[i].categorie === "enfant") {
        datasme.push(produits[i]);
      }
    }
    for (let i = 0; i < 4; i++) {
      cardComposant(sLocal, datasLocal, i);
      cardComposant(ff, datasff, i);
      cardComposant(rg, datasrg, i);
      cardComposant(me, datasme, i);
    }
  });
//toogle
let showUnshow = (toggleObj, parentElement, parentName, data) => {
  if (!toggleObj.value) {
    if (data.length > 4) {
      for (let i = 4; i < data.length; i++) {
        cardComposant(parentElement, data, i);
      }
    }
    toggleObj.value = true;
  } else {
    document
      .querySelectorAll(`#${parentName} .elementE`)
      .forEach((element, index) => {
        if (index > 3) {
          element.remove();
        }
      });
    toggleObj.value = false;
  }
};

var toggleObj = { value: false };
var toggleObj2 = { value: false };
var toggleObj3 = { value: false };
var toggleObj4 = { value: false };

document.getElementById("btnD").addEventListener("click", () => {
  showUnshow(toggleObj, sLocal, "sLocal", datasLocal);
});
document.getElementById("btnff").addEventListener("click", () => {
  showUnshow(toggleObj2, ff, "ff", datasff);
});
document.getElementById("btnrg").addEventListener("click", () => {
  showUnshow(toggleObj3, rg, "rg", datasrg);
});
document.getElementById("btnme").addEventListener("click", () => {
  showUnshow(toggleObj4, me, "me", datasme);
});
