// ============================================
// VARIABLES GLOBALES
// ============================================
let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
let map;
let markers = [];

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFilters();
    initRestaurantFilters();
    initMap();
    initScrollAnimations();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// FILTRES ACTIVITÉS
// ============================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.activites .filter-btn');
    const cards = document.querySelectorAll('.activity-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// FILTRES RESTAURANTS
// ============================================
function initRestaurantFilters() {
    const filterButtons = document.querySelectorAll('.restaurants .filter-btn');
    const cards = document.querySelectorAll('.establishment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-type');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            cards.forEach(card => {
                const type = card.getAttribute('data-type');
                
                if (filter === 'all' || type === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// ÉTOILES INTERACTIVES
// ============================================
function rate(starElement, rating) {
    const starsContainer = starElement.parentElement;
    const stars = starsContainer.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#e67e22';
        } else {
            star.classList.remove('active');
            star.style.color = '#d4e6f1';
        }
    });
    
    starsContainer.setAttribute('data-rating', rating);
}

// ============================================
// LIGHTBOX
// ============================================
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-overlay').textContent;
    
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-caption').textContent = caption;
    
    lightbox.classList.add('active');
    
    galleryItems.forEach((item, index) => {
        if (item === element) currentImageIndex = index;
    });
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryItems.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = galleryItems.length - 1;
    
    const item = galleryItems[currentImageIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay').textContent;
    
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-caption').textContent = caption;
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
});

// ============================================
// CARTE LEAFLET - AGADIR
// ============================================
function initMap() {
    const agadirLat = 30.4278;
    const agadirLng = -9.5981;
    
    map = L.map('map').setView([agadirLat, agadirLng], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    const places = [
        { lat: 30.4278, lng: -9.5981, name: 'Plage d\'Agadir', desc: '10 km de plage de sable fin' },
        { lat: 30.4260, lng: -9.6120, name: 'Kasbah d\'Agadir', desc: 'Forteresse historique du XVIe siècle' },
        { lat: 30.4030, lng: -9.6000, name: 'Souk El Had', desc: 'Plus grand souk du Maroc' },
        { lat: 30.3800, lng: -9.5500, name: 'Vallée du Paradis', desc: 'Oasis naturelle avec piscines' },
        { lat: 30.4150, lng: -9.6200, name: 'Port de Pêche', desc: 'Port sardinière animé' },
        { lat: 30.4300, lng: -9.5900, name: 'Corniche', desc: 'Promenade en bord de mer' }
    ];
    
    places.forEach(place => {
        const marker = L.marker([place.lat, place.lng]).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.desc}`);
        markers.push(marker);
    });
}

function flyToPlace(lat, lng, name) {
    map.flyTo([lat, lng], 14, { duration: 1.5 });
    
    setTimeout(() => {
        markers.forEach(marker => {
            const markerLat = marker.getLatLng().lat;
            const markerLng = marker.getLatLng().lng;
            if (Math.abs(markerLat - lat) < 0.001 && Math.abs(markerLng - lng) < 0.001) {
                marker.openPopup();
            }
        });
    }, 1600);
}

// ============================================
// VALIDATION FORMULAIRE
// ============================================
function validateForm(event) {
    event.preventDefault();
    
    let isValid = true;
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    if (name.length < 3) {
        showError('nameError', 'Le nom doit contenir au moins 3 caractères');
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Veuillez entrer un email valide');
        isValid = false;
    }
    
    if (subject.length < 5) {
        showError('subjectError', 'Le sujet doit contenir au moins 5 caractères');
        isValid = false;
    }
    
    if (message.length < 10) {
        showError('messageError', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }
    
    if (isValid) {
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
        document.getElementById('contactForm').reset();
    }
    
    return false;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// ============================================
// ANIMATIONS SCROLL
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.activity-card, .establishment-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ============================================
// PARALLAX HERO
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
    }
});