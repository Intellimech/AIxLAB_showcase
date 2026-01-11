// Funzione globale per entrare nel sito (usata dai bottoni della Landing)
window.enterSite = function(targetId) {
    const landing = document.getElementById('landing-screen');
    const body = document.body;

    // 1. Nascondi la Landing Page
    if (landing) {
        landing.classList.add('hidden'); // Aggiunge la classe che mette opacity: 0
        
        // Aspetta la fine della transizione (0.5s) per rimuoverlo dal flusso (opzionale)
        setTimeout(() => {
            landing.style.display = 'none';
        }, 500);
    }

    // 2. Sblocca lo scroll del body
    body.classList.remove('locked');

    // 3. Se c'è una categoria specifica, vacci
    if (targetId) {
        // Piccola attesa per dare tempo al browser di "sbloccare" il layout
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            const navHeight = document.querySelector('.nav-shortcuts')?.offsetHeight || 70;
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight - 10,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- A. CONTROLLO URL PER "APP MODE" ---
    // Se l'URL contiene ?mode=app (es. arrivo da un progetto), salto la landing
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app') {
        // Eseguo l'ingresso immediato senza animazioni lente
        const landing = document.getElementById('landing-screen');
        if (landing) {
            landing.style.display = 'none'; // Nascondo brutalmente subito
            landing.classList.add('hidden');
        }
        document.body.classList.remove('locked');
    }


    // --- B. LOGICA NAVIGAZIONE (Il codice che avevamo già) ---
    const navLinks = document.querySelectorAll('.shortcut-card');
    const sections = document.querySelectorAll('.category-section');
    const navContainer = document.querySelector('.nav-buttons-container');

    // Funzione per centrare orizzontalmente il pulsante attivo
    function centerActiveBtn(activeBtn) {
        if (!activeBtn || !navContainer) return;
        const containerWidth = navContainer.offsetWidth;
        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.offsetWidth;
        const scrollPos = btnLeft + (btnWidth / 2) - (containerWidth / 2);

        navContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }

    // Gestione CLICK sui pulsanti nav
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            centerActiveBtn(link);

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const navHeight = document.querySelector('.nav-shortcuts')?.offsetHeight || 70;
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Funzione SCROLL SPY
    function onScroll() {
        const scrollPos = window.scrollY;
        const navHeight = document.querySelector('.nav-shortcuts')?.offsetHeight || 70;
        
        // Rilevamento Fine Pagina
        const totalHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        if ((windowHeight + scrollPos) >= totalHeight - 50) {
            navLinks.forEach(n => n.classList.remove('active'));
            const lastLink = navLinks[navLinks.length - 1];
            if (lastLink) {
                lastLink.classList.add('active');
                centerActiveBtn(lastLink);
            }
            return;
        }

        // Rilevamento Sezioni
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; 
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                        centerActiveBtn(link);
                    }
                });
            }
        });
    }

    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            onScroll();
            // Back to top logic
            const backToTopBtn = document.getElementById('backToTopBtn');
            if (backToTopBtn) {
                backToTopBtn.classList.toggle('visible', window.scrollY > 300);
            }
        }, 10);
    });

    const backToTopBtn = document.getElementById('backToTopBtn');
    if(backToTopBtn){
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Init
    onScroll();
});


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