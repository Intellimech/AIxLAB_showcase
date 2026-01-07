// --- CONTROLLO MODALITÀ AVVIO (Salto Copertina) ---
document.addEventListener("DOMContentLoaded", () => {
    // Leggiamo i parametri dell'URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Se troviamo ?mode=app (significa che torniamo da un progetto)
    if (urlParams.get('mode') === 'app') {
        const landingScreen = document.getElementById('landing-screen');
        
        if (landingScreen) {
            // 1. Nascondiamo la copertina ISTANTANEAMENTE (senza animazione)
            landingScreen.style.opacity = '0'; 
            landingScreen.style.visibility = 'hidden';
            landingScreen.classList.add('hidden');
            // Nota: usiamo style inline per sovrascrivere tutto subito ed evitare "flash"
            landingScreen.style.display = 'none'; 
        }

        // 2. Sblocchiamo subito il body
        document.body.classList.remove('locked');
    }
});

// ... qui sotto inizia il resto del tuo codice (function enterSite, ecc.) ...


// Funzione chiamata dai bottoni della Landing Page
function enterSite(category) {
    // 1. Sfuma via la copertina
    const landingScreen = document.getElementById('landing-screen');
    landingScreen.classList.add('hidden');
    
    // 2. Sblocca lo scroll del body
    document.body.classList.remove('locked');

    // 3. Attiva il bottone giusto nella navbar
    const navLinks = document.querySelectorAll('.shortcut-card');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').includes(category)) {
            link.classList.add('active');
        }
    });

    // 4. Scrolla alla sezione giusta (con un piccolo ritardo per aspettare la sfumatura)
    setTimeout(() => {
        const targetSection = document.getElementById(category);
        if (targetSection) {
            // Calcolo offset della navbar (70px) + un po' di spazio (20px)
            const offset = 90; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetSection.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}

// --- LOGICA DI NAVIGAZIONE DURANTE L'USO (Scroll Spy) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.shortcut-card');
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    // Se la copertina è ancora visibile, non fare calcoli inutili
    if (document.body.classList.contains('locked')) return;

    let current = '';

    // Tasto Torna Su
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Evidenziazione menu automatica
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Listener per i link della navbar (per navigare dopo essere entrati)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Comportamento standard dello scroll smooth gestito dal CSS html {scroll-behavior: smooth}
        // Aggiungiamo solo la classe active manuale per feedback istantaneo
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});