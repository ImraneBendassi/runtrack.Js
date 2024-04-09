// Vérification du domaine de l'email
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var domain = email.split('@')[1];
    if (domain !== 'laplateforme.io') {
        alert('Veuillez utiliser une adresse email avec le domaine @laplatforme.io');
    } else {
        alert('Inscription réussie');
    }
});

// Gestion des demandes d'autorisation
document.getElementById('request-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var date = new Date(document.getElementById('date').value);
    var today = new Date();
    if (date < today) {
        alert('La date de présence doit être future.');
        return;
    }
    var requests = JSON.parse(localStorage.getItem('requests')) || [];
    requests.push({ date: date.toISOString().split('T')[0], status: 'pending' });
    localStorage.setItem('requests', JSON.stringify(requests));
    alert('Demande envoyée');
});

// Backoffice et gestion des droits
function displayRequests() {
    var requests = JSON.parse(localStorage.getItem('requests')) || [];
    var list = document.getElementById('requests-list');
    list.innerHTML = '';
    requests.forEach(function(request, index) {
        var item = document.createElement('div');
        item.textContent = 'Date: ' + request.date + ', Statut: ' + request.status;
        var acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accepter';
        acceptButton.onclick = function() {
            request.status = 'accepted';
            localStorage.setItem('requests', JSON.stringify(requests));
            displayRequests();
        };
        var refuseButton = document.createElement('button');
        refuseButton.textContent = 'Refuser';
        refuseButton.onclick = function() {
            request.status = 'refused';
            localStorage.setItem('requests', JSON.stringify(requests));
            displayRequests();
        };
        item.appendChild(acceptButton);
        item.appendChild(refuseButton);
        list.appendChild(item);
    });
}

displayRequests();

// Charger les données JSON depuis le fichier
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'users.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
  }

  // Modifier les données JSON et enregistrer dans le fichier
  function saveJSON(data) {
    var jsonData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save.php", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonData);
  }

  // Exemple de modification des données
  loadJSON(function(response) {
    var users = response.users;
    // Ajouter un nouveau utilisateur avec un rôle
    users.push({ "username": "nouvel_utilisateur", "role": "moderateur" });
    // Supprimer un utilisateur spécifique
    var userToDelete = "utilisateur2";
    users = users.filter(function(user) {
      return user.username !== userToDelete;
    });
    // Enregistrer les modifications dans le fichier JSON
    saveJSON(response);
  });

// Backoffice pour les modérateurs et administrateurs
document.getElementById('login-as-moderator').addEventListener('click', function() {
    // Simuler la connexion en tant que modérateur
    alert('Connecté en tant que modérateur');
    displayRequests();
});

document.getElementById('login-as-admin').addEventListener('click', function() {
    // Simuler la connexion en tant qu'administrateur
    alert('Connecté en tant qu\'administrateur');
    displayRequests();
});

// Exemple de fonction pour gérer la demande d'autorisation
function submitAuthorizationRequest(date, reason) {
    // Vérifier si la date est déjà passée
    var currentDate = new Date();
    if (date < currentDate) {
        alert("Impossible de modifier la demande pour une date passée.");
        return;
    }

    // Envoyer la demande d'autorisation au serveur
    // Ici, vous pouvez effectuer une requête AJAX pour envoyer les données au serveur
    // Par exemple :
    // $.ajax({
    //     type: "POST",
    //     url: "submit_request.php",
    //     data: { date: date, reason: reason },
    //     success: function(response) {
    //         alert("Demande d'autorisation soumise avec succès!");
    //     },
    //     error: function() {
    //         alert("Erreur lors de la soumission de la demande.");
    //     }
    // });
}

// Exemple de fonction pour désactiver la modification des demandes passées
function disablePastRequests() {
    var currentDate = new Date();
    // Sélectionner tous les éléments de formulaire correspondant aux dates passées
    var pastDates = document.querySelectorAll('input[type="date"]:not([disabled])');
    pastDates.forEach(function(input) {
        var inputDate = new Date(input.value);
        if (inputDate < currentDate) {
            // Désactiver l'élément de formulaire si la date est passée
            input.disabled = true;
            // Vous pouvez également masquer le bouton de soumission associé ou afficher un message
            // Par exemple :
            // input.nextElementSibling.style.display = 'none'; // Masquer le bouton de soumission
            // input.parentElement.querySelector('.message').innerHTML = 'La date est passée.'; // Afficher un message
        }
    });
}

// Appel de la fonction pour désactiver les demandes passées au chargement de la page
window.onload = disablePastRequests;
