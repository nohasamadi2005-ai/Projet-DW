/* =====================================================
   CHEFCHAOUEN - Fichier JavaScript principal
   Auteur : Groupe GI1-2026
   Description : Toutes les fonctionnalités interactives
===================================================== */

/* DOMContentLoaded : attend que tout le HTML soit chargé avant d'exécuter le JS */
document.addEventListener('DOMContentLoaded', function () {

  /* ==============================================
     1. ANIMATION DU HERO AU CHARGEMENT
     Fait apparaître titre, sous-titre, description
     avec des délais successifs (effet cascade)
  ============================================== */

  /* Récupération des éléments HTML par leur id */
  var heroTitle    = document.getElementById('heroTitle');
  var heroSubtitle = document.getElementById('heroSubtitle');
  var heroDesc     = document.getElementById('heroDesc');

  /* setTimeout : exécute la fonction après X millisecondes */
  /* On ajoute la classe 'visible' qui déclenche la transition CSS */
  if (heroTitle) {
    setTimeout(function() { heroTitle.classList.add('visible');    }, 200); /* Titre après 0.2s */
    setTimeout(function() { heroSubtitle.classList.add('visible'); }, 500); /* Sous-titre après 0.5s */
    setTimeout(function() { heroDesc.classList.add('visible');     }, 800); /* Description après 0.8s */
  }

  /* ==============================================
     2. NAVBAR : CHANGE DE COULEUR AU SCROLL
     Devient bleue opaque après 80px de défilement
  ============================================== */

  var navbar = document.getElementById('navbar');

  /* Événement scroll : déclenché à chaque pixel de défilement */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      /* window.scrollY : distance défilée en pixels depuis le haut */
      navbar.classList.add('scrolled');    /* Fond bleu opaque */
    } else {
      navbar.classList.remove('scrolled'); /* Fond transparent */
    }
  });

  /* ==============================================
     3. MENU HAMBURGER MOBILE
     Affiche/cache le menu au clic sur le bouton
  ============================================== */

  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    /* Clic sur le hamburger : bascule l'état du menu */
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open'); /* toggle : ajoute si absent, enlève si présent */
    });

    /* Ferme le menu quand on clique sur un lien */
    var liens = navLinks.querySelectorAll('a');
    liens.forEach(function(lien) {
      lien.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ==============================================
     4. FILTRE DES ACTIVITÉS TOURISTIQUES
     Cache/affiche les cards selon la catégorie choisie
  ============================================== */

  var filterActivites = document.getElementById('filterActivites');

  if (filterActivites) {
    /* Sélectionne tous les boutons de filtre de la section activités */
    var btnsActivites = filterActivites.querySelectorAll('.filter-btn');

    btnsActivites.forEach(function(btn) {
      btn.addEventListener('click', function () {
        /* Récupère la valeur du filtre choisi (ex: "nature", "culture", "all") */
        var filtre = btn.getAttribute('data-filter');

        /* Met le bouton cliqué en actif, retire l'état actif des autres */
        btnsActivites.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        /* Récupère toutes les cards de la grille des activités */
        var cards = document.querySelectorAll('#activitesGrid .card');

        cards.forEach(function(card) {
          /* Récupère la catégorie de la card (ex: "nature", "culture") */
          var categorie = card.getAttribute('data-category');

          if (filtre === 'all' || categorie === filtre) {
            /* 'all' affiche tout, sinon affiche seulement la catégorie correspondante */
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden'); /* Cache la card qui ne correspond pas */
          }
        });
      });
    });
  }

  /* ==============================================
     5. FILTRE DES RESTAURANTS ET HÉBERGEMENTS
     Même logique que le filtre des activités
  ============================================== */

  var filterResto = document.getElementById('filterResto');

  if (filterResto) {
    var btnsResto = filterResto.querySelectorAll('.filter-btn');

    btnsResto.forEach(function(btn) {
      btn.addEventListener('click', function () {
        var filtre = btn.getAttribute('data-filter');

        /* Met à jour le bouton actif */
        btnsResto.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        /* Filtre les cards de la grille restaurants */
        var cards = document.querySelectorAll('#restGrid .card');
        cards.forEach(function(card) {
          var categorie = card.getAttribute('data-category');
          if (filtre === 'all' || categorie === filtre) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ==============================================
     6. LIGHTBOX - GALERIE PHOTOS
     Clic sur une photo → s'ouvre en grand
     Navigation avec flèches gauche/droite
     Fermeture avec bouton X, fond ou touche Echap
  ============================================== */

  /* Récupération de tous les éléments de la galerie */
  var galerieItems = document.querySelectorAll('.galerie-item');

  /* Récupération des éléments de la lightbox */
  var lightbox  = document.getElementById('lightbox');
  var lbImg     = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose   = document.getElementById('lbClose');
  var lbPrev    = document.getElementById('lbPrev');
  var lbNext    = document.getElementById('lbNext');

  /* Index de la photo actuellement affichée dans la lightbox */
  var indexActuel = 0;

  /* ---- Fonction pour ouvrir la lightbox sur une photo donnée ---- */
  function ouvrirLightbox(index) {
    /* Mémorise l'index courant pour la navigation suivant/précédent */
    indexActuel = index;

    /* Récupère les données de la photo cliquée */
    var item    = galerieItems[index];
    var imgSrc  = item.getAttribute('data-full');    /* Chemin grande image */
    var caption = item.getAttribute('data-caption'); /* Légende */

    /* Charge l'image dans la balise <img> de la lightbox */
    lbImg.src = imgSrc;
    /* Affiche la légende */
    lbCaption.textContent = caption;

    /* Affiche la lightbox en ajoutant la classe 'active' (CSS : display flex) */
    lightbox.classList.add('active');

    /* Bloque le défilement de la page derrière la lightbox */
    document.body.style.overflow = 'hidden';
  }

  /* ---- Fonction pour fermer la lightbox ---- */
  function fermerLightbox() {
    lightbox.classList.remove('active'); /* Cache la lightbox */
    document.body.style.overflow = '';  /* Réactive le défilement */
    lbImg.src = '';                     /* Vide l'image pour libérer la mémoire */
  }

  /* ---- Clic sur chaque item de la galerie ---- */
  if (galerieItems.length > 0 && lightbox) {
    galerieItems.forEach(function(item, index) {
      /* Chaque item de la galerie reçoit un écouteur de clic */
      item.addEventListener('click', function () {
        ouvrirLightbox(index); /* Ouvre la lightbox avec l'index de cette photo */
      });
    });

    /* ---- Bouton fermer (X) ---- */
    if (lbClose) {
      lbClose.addEventListener('click', function(e) {
        e.stopPropagation(); /* Empêche la propagation du clic vers le fond */
        fermerLightbox();
      });
    }

    /* ---- Clic sur le fond sombre pour fermer ---- */
    lightbox.addEventListener('click', function(e) {
      /* e.target : élément réellement cliqué */
      /* Si on clique sur le fond (la lightbox elle-même, pas l'image) */
      if (e.target === lightbox) {
        fermerLightbox();
      }
    });

    /* ---- Bouton photo précédente ---- */
    if (lbPrev) {
      lbPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        /* Opérateur modulo : revient à la dernière depuis la première */
        indexActuel = (indexActuel - 1 + galerieItems.length) % galerieItems.length;
        ouvrirLightbox(indexActuel);
      });
    }

    /* ---- Bouton photo suivante ---- */
    if (lbNext) {
      lbNext.addEventListener('click', function(e) {
        e.stopPropagation();
        /* Opérateur modulo : revient à la première depuis la dernière */
        indexActuel = (indexActuel + 1) % galerieItems.length;
        ouvrirLightbox(indexActuel);
      });
    }

    /* ---- Navigation clavier ---- */
    document.addEventListener('keydown', function(e) {
      /* Ne rien faire si la lightbox est fermée */
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'ArrowLeft')  { lbPrev.click(); }  /* Flèche gauche → précédent */
      if (e.key === 'ArrowRight') { lbNext.click(); }  /* Flèche droite → suivant */
      if (e.key === 'Escape')     { fermerLightbox(); } /* Échap → fermer */
    });
  }

  /* ==============================================
     7. CARTE INTERACTIVE LEAFLET.JS
     Carte centrée sur Chefchaouen avec marqueurs
     sur les lieux touristiques
  ============================================== */

  /* Vérification que Leaflet est disponible (chargé via CDN dans le HTML) */
  if (typeof L !== 'undefined' && document.getElementById('map')) {

    /* Coordonnées GPS du centre de Chefchaouen */
    var LAT_CENTRE = 35.1688;
    var LNG_CENTRE = -5.2687;

    /* Initialisation de la carte Leaflet dans le div#map */
    var carte = L.map('map', {
      center: [LAT_CENTRE, LNG_CENTRE], /* Centre de la carte */
      zoom: 15,                          /* Niveau de zoom (15 = échelle de quartier) */
      scrollWheelZoom: false             /* Désactive le zoom à la molette */
    });

    /* Couche de tuiles OpenStreetMap : images qui forment la carte */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19 /* Zoom maximum disponible */
    }).addTo(carte); /* Ajoute la couche à la carte */

    /* Données des lieux touristiques avec coordonnées GPS et description */
    var lieux = [
      { nom: 'Place Outa El Hammam', lat: 35.1688, lng: -5.2687,
        desc: '🏛️ Cœur historique de Chefchaouen. Cafés et Kasbah.' },
      { nom: 'La Kasbah', lat: 35.1671, lng: -5.2701,
        desc: '🏰 Forteresse du 15ème siècle avec musée ethnographique.' },
      { nom: 'Mosquée Al-Andalus', lat: 35.1700, lng: -5.2660,
        desc: '🕌 Mosquée d\'architecture hispano-mauresque.' },
      { nom: 'Ras El Ma', lat: 35.1650, lng: -5.2720,
        desc: '💧 Source d\'eau naturelle et lavoir traditionnel.' },
      { nom: "Cascades d'Akchour", lat: 35.0954, lng: -5.1742,
        desc: '🌊 Cascades majestueuses à 30 km de la ville.' },
      { nom: 'Souk artisanal', lat: 35.1590, lng: -5.2700,
        desc: '🛍️ Tapis berbères, poteries et souvenirs colorés.' }
    ];

    /* Stockage des marqueurs pour pouvoir les manipuler depuis la liste */
    var marqueurs = {};

    /* Création d'un marqueur Leaflet pour chaque lieu */
    lieux.forEach(function(lieu) {
      /* L.marker : crée un marqueur aux coordonnées [lat, lng] */
      var marqueur = L.marker([lieu.lat, lieu.lng])
        .addTo(carte) /* Ajoute le marqueur à la carte */
        .bindPopup(   /* Associe une popup cliquable au marqueur */
          '<div style="font-family:Lato,sans-serif;min-width:160px">' +
            '<strong style="color:#1A3C5E;font-size:0.95rem">' + lieu.nom + '</strong>' +
            '<p style="margin:6px 0 0;font-size:0.82rem;color:#555">' + lieu.desc + '</p>' +
          '</div>'
        );
      /* Stocke le marqueur avec le nom du lieu comme clé */
      marqueurs[lieu.nom] = marqueur;
    });

    /* Liaison entre la liste des lieux et la carte */
    var lieuItems = document.querySelectorAll('.lieu-item');

    lieuItems.forEach(function(item) {
      item.addEventListener('click', function() {
        /* Met l'item cliqué en actif */
        lieuItems.forEach(function(i) { i.classList.remove('active'); });
        item.classList.add('active');

        /* Récupère les coordonnées et le nom du lieu */
        var lat  = parseFloat(item.getAttribute('data-lat'));
        var lng  = parseFloat(item.getAttribute('data-lng'));
        var name = item.getAttribute('data-name');

        /* Centre la carte sur ce lieu avec animation fluide */
        carte.setView([lat, lng], 16, { animate: true, duration: 0.8 });

        /* Ouvre le popup du marqueur correspondant */
        if (marqueurs[name]) {
          marqueurs[name].openPopup();
        }
      });
    });
  }

  /* ==============================================
     8. MÉTÉO EN TEMPS RÉEL - API OpenWeatherMap
     Récupère et affiche la météo actuelle de Chefchaouen
  ============================================== */

  /* Clé API OpenWeatherMap : créez un compte gratuit sur openweathermap.org
     et remplacez 'VOTRE_CLE_API' par votre vraie clé */
  var CLE_API = 'VOTRE_CLE_API';
  var VILLE   = 'Chefchaouen';
  var PAYS    = 'MA'; /* Code ISO du Maroc */

  /* Construction de l'URL de l'API avec les paramètres */
  /* units=metric : températures en Celsius | lang=fr : descriptions en français */
  var urlAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + VILLE + ',' + PAYS
             + '&appid=' + CLE_API + '&units=metric&lang=fr';

  /* fetch() : fait une requête HTTP vers l'API et retourne une Promise */
  fetch(urlAPI)
    .then(function(reponse) {
      /* Vérifie que la requête a réussi (code HTTP 200) */
      if (!reponse.ok) throw new Error('Erreur API météo');
      return reponse.json(); /* Convertit la réponse en objet JavaScript */
    })
    .then(function(donnees) {
      /* Extraction des données depuis l'objet JSON retourné par l'API */
      var temp      = Math.round(donnees.main.temp);           /* Température (arrondie) */
      var ressenti  = Math.round(donnees.main.feels_like);     /* Température ressentie */
      var humidite  = donnees.main.humidity + '%';             /* Humidité relative */
      var vent      = Math.round(donnees.wind.speed * 3.6) + ' km/h'; /* Vent m/s → km/h */
      var desc      = donnees.weather[0].description;          /* Description (ex: "nuageux") */
      var iconeCode = donnees.weather[0].icon;                 /* Code icône météo */
      var iconeUrl  = 'https://openweathermap.org/img/wn/' + iconeCode + '@2x.png';

      /* Mise à jour du HTML avec les données météo reçues */
      var meteoDisplay = document.getElementById('meteoDisplay');
      if (meteoDisplay) {
        meteoDisplay.innerHTML =
          '<div class="meteo-temp-display">' +
            '<img src="' + iconeUrl + '" alt="' + desc + '" style="width:60px;margin:0 auto"/>' +
            '<div class="meteo-temp">' + temp + '°C</div>' +
            '<div class="meteo-desc">' + desc + '</div>' +
            '<div class="meteo-ville"><i class="fas fa-map-marker-alt"></i> Chefchaouen, Maroc</div>' +
          '</div>';
      }

      /* Mise à jour des statistiques (humidité, vent, ressenti) */
      var meteoDetails = document.getElementById('meteoDetails');
      if (meteoDetails) {
        document.getElementById('humidity').textContent  = humidite;
        document.getElementById('wind').textContent      = vent;
        document.getElementById('feelsLike').textContent = ressenti + '°C';
        meteoDetails.style.display = 'grid'; /* Affiche la grille */
      }
    })
    .catch(function(erreur) {
      /* En cas d'erreur (clé invalide, pas internet, etc.) */
      console.error('Erreur météo :', erreur);

      /* Affiche des données de démonstration */
      var meteoDisplay = document.getElementById('meteoDisplay');
      if (meteoDisplay) {
        meteoDisplay.innerHTML =
          '<div class="meteo-temp-display">' +
            '<div class="meteo-temp">18°C</div>' +
            '<div class="meteo-desc">Partiellement nuageux</div>' +
            '<div class="meteo-ville"><i class="fas fa-map-marker-alt"></i> Chefchaouen, Maroc</div>' +
            '<p style="font-size:0.75rem;opacity:0.6;margin-top:10px">Données démo — Ajoutez votre clé API</p>' +
          '</div>';
        var meteoDetails = document.getElementById('meteoDetails');
        if (meteoDetails) {
          document.getElementById('humidity').textContent  = '62%';
          document.getElementById('wind').textContent      = '14 km/h';
          document.getElementById('feelsLike').textContent = '16°C';
          meteoDetails.style.display = 'grid';
        }
      }
    });

  /* ==============================================
     9. VALIDATION DU FORMULAIRE DE CONTACT
     Vérifie les champs avant envoi, affiche les erreurs
  ============================================== */

  var formulaire = document.getElementById('contactForm');

  if (formulaire) {
    /* Écoute la soumission du formulaire */
    formulaire.addEventListener('submit', function(e) {
      e.preventDefault(); /* Empêche le rechargement de la page */

      var estValide = true; /* Indicateur de validité globale */

      /* --- Validation du champ Nom --- */
      var chamNom   = document.getElementById('nom');
      var errNom    = document.getElementById('nomError');
      if (!chamNom.value.trim()) {
        /* trim() supprime les espaces en début/fin */
        afficherErreur(chamNom, errNom, 'Veuillez entrer votre nom complet.');
        estValide = false;
      } else if (chamNom.value.trim().length < 3) {
        afficherErreur(chamNom, errNom, 'Le nom doit contenir au moins 3 caractères.');
        estValide = false;
      } else {
        effacerErreur(chamNom, errNom);
      }

      /* --- Validation du champ Email --- */
      var chamEmail = document.getElementById('email');
      var errEmail  = document.getElementById('emailError');
      /* Expression régulière pour valider le format de l'email */
      var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!chamEmail.value.trim()) {
        afficherErreur(chamEmail, errEmail, 'Veuillez entrer votre adresse email.');
        estValide = false;
      } else if (!regexEmail.test(chamEmail.value)) {
        /* test() : retourne true si l'email correspond au format attendu */
        afficherErreur(chamEmail, errEmail, 'Format invalide (ex: nom@domaine.com).');
        estValide = false;
      } else {
        effacerErreur(chamEmail, errEmail);
      }

      /* --- Validation du sujet --- */
      var chamSujet = document.getElementById('sujet');
      var errSujet  = document.getElementById('sujetError');
      if (!chamSujet.value) {
        afficherErreur(chamSujet, errSujet, 'Veuillez choisir un sujet.');
        estValide = false;
      } else {
        effacerErreur(chamSujet, errSujet);
      }

      /* --- Validation du message --- */
      var chamMsg = document.getElementById('message');
      var errMsg  = document.getElementById('messageError');
      if (!chamMsg.value.trim()) {
        afficherErreur(chamMsg, errMsg, 'Veuillez écrire un message.');
        estValide = false;
      } else if (chamMsg.value.trim().length < 20) {
        afficherErreur(chamMsg, errMsg, 'Le message doit contenir au moins 20 caractères.');
        estValide = false;
      } else {
        effacerErreur(chamMsg, errMsg);
      }

      /* --- Si tout est valide : afficher le succès --- */
      if (estValide) {
        var successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          successMsg.style.display = 'flex'; /* Affiche le message vert */
        }
        /* Réinitialise le formulaire après 3 secondes */
        setTimeout(function() {
          formulaire.reset();
          if (successMsg) { successMsg.style.display = 'none'; }
        }, 3000); /* 3000ms = 3 secondes */
      }
    });

    /* Efface les erreurs en temps réel quand l'utilisateur corrige un champ */
    var champIds = ['nom', 'email', 'sujet', 'message'];
    champIds.forEach(function(id) {
      var champ  = document.getElementById(id);
      var erreur = document.getElementById(id + 'Error');
      if (champ && erreur) {
        /* 'input' : déclenché à chaque caractère saisi */
        champ.addEventListener('input', function() {
          if (champ.value.trim()) {
            effacerErreur(champ, erreur);
          }
        });
      }
    });
  }

  /* --- Fonctions utilitaires pour la validation --- */

  /* Affiche un message d'erreur et met le champ en rouge */
  function afficherErreur(champ, elementErreur, message) {
    champ.classList.add('error');           /* Bordure rouge via CSS */
    elementErreur.textContent = message;   /* Texte d'erreur */
  }

  /* Efface le message d'erreur et retire la bordure rouge */
  function effacerErreur(champ, elementErreur) {
    champ.classList.remove('error');
    elementErreur.textContent = '';
  }

}); /* fin DOMContentLoaded */