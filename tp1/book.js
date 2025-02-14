import request from "request";

const SUBJECT = "philosophy";
const BASE_URL = `https://openlibrary.org/subjects/${SUBJECT}.json?limit=5`;

function fetchBooks() {
  request(BASE_URL, { headers: { "User-Agent": "Mozilla/5.0" } }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log("\nHeaders:", response.headers);

      const data = JSON.parse(body);
      console.log(`\nSujet: ${data.name}`);
      console.log(`Nombre total d'ouvrages: ${data.work_count}`);
      console.log("\nListe des livres trouvés:\n");

      data.works.forEach((work, index) => {
        console.log(`${index + 1}. Titre: ${work.title}`);
        console.log(`   Auteur(s): ${work.authors?.map(a => a.name).join(", ") || "Inconnu"}`);
        console.log(`   Nombre d'éditions: ${work.edition_count}`);
        console.log(`   Texte complet disponible: ${work.has_fulltext ? "Oui" : "Non"}`);
        console.log("------------------------------------------------");
      });
    } else {
      console.log("\nErreur lors de la récupération des données.");
    }
  });
}

fetchBooks();
