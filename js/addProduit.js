// js/main.js
import {
  firestore,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
  updateDoc,
  getDownloadURL,
} from "./goFB.js";

//cors
const xhttp = new XMLHttpRequest();
// Ajout de données à Firestore avec référence au fichier stocké
function ajouterProduitAvecImage(nom, description, prix, imageFile) {
  const collectionRef = collection(firestore, "produits");

  addDoc(collectionRef, {
    nom: nom,
    description: description,
    prix: prix,
  })
    .then(async (docRef) => {
      const imageUrl = `images/${imageFile.name}`;
      const imageRef = ref(storage, imageUrl);

      try {
        // Téléchargez l'image vers l'emplacement de stockage correspondant
        await uploadBytes(imageRef, imageFile);
        console.log("Image téléchargée avec succès !");

        // Obtenez l'URL de téléchargement de l'image
        const imageURL = await getDownloadURL(imageRef);

        // Mettez à jour le document avec l'URL de l'image dans Firestore
        await updateDoc(docRef, { imageURL: imageURL });
        console.log("URL de l'image ajoutée à Firestore !");
      } catch (error) {
        console.error(
          "Erreur lors du téléchargement et de la mise à jour :",
          error
        );
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du produit :", error);
    });
}

// Utilisation de la fonction pour ajouter un produit avec une image
// Récupérez l'élément input et le bouton
const imageInput = document.getElementById("imageInput");

document.getElementById("tele").addEventListener("click", () => {
  const fichierImage = imageInput.files[0]; // Récupère le fichier sélectionné

  // Vérifie si un fichier a été sélectionné
  if (fichierImage) {
    ajouterProduitAvecImage(
      "Produit 1",
      "Description du produit 1",
      19.99,
      fichierImage
    );
  } else {
    console.log("Aucun fichier sélectionné.");
  }
});
