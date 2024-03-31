function jsonValueKey(jsonString, key) {
    // Convertir la chaîne JSON en objet JavaScript
    const jsonObject = JSON.parse(jsonString);
  
    // Vérifier si la clé existe dans l'objet
    if (key in jsonObject) {
      // Retourner la valeur associée à la clé
      return jsonObject[key];
    } else {
      // Si la clé n'existe pas, retourner une valeur par défaut ou null
      return null;
    }
  }
  
  // Exemple d'utilisation
  const jsonString = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
  }`;
  
  const key = "city";
  const value = jsonValueKey(jsonString, key);
  console.log(value); // Affiche "Marseille"