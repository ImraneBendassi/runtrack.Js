// Fonction pour rebooter le monde
function rebooterMonde() {
    var citations = [
        "Toutes ces moments se perdront dans l'oubli, comme les larmes dans la pluie.",
        "Il est temps de mourir.",
        "Je pense, donc je suis.",
        // Ajoutez d'autres citations de Blade Runner ici
    ];
    var citationAleatoire = citations[Math.floor(Math.random() * citations.length)];
    $("#jumbotronText").text(citationAleatoire);
}
// Fonction pour changer le contenu du jumbotron en fonction de la page sélectionnée
function changerContenuPage(page) {
    var contenu;
    if (page === 1) {
        contenu = "Contenu de la première page.";
    } else if (page === 2) {
        contenu = "Contenu de la deuxième page.";
    } else {
        contenu = "Contenu de la page inconnue.";
    }
    $("#jumbotronText").text(contenu);
}
