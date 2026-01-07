const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-shortcuts a');
const navBar = document.querySelector('.nav-shortcuts');
const header = document.querySelector('.main-header');
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    
    // --- 1. Gestione LOGHI NAV BAR (Con Fix Anticipo) ---
    const headerHeight = header.offsetHeight;
    // FIX: Sottraiamo 100px. Appena l'header è quasi uscito, facciamo entrare i loghi laterali.
    // Questo elimina il "buco" visivo che notavi.
    if (window.scrollY > (headerHeight - 200)) {
        navBar.classList.add('show-logos');
    } else {
        navBar.classList.remove('show-logos');
    }

    // --- 2. Gestione TASTO TORNA SU ---
    // Compare solo dopo aver scrollato 300px
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // --- 3. Gestione BOTTONI ACTIVE ---
    let current = sections[0].getAttribute('id');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) {
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

// --- 4. Click sul Tasto Torna Su (Scroll Liscio) ---
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita che aggiunga # all'URL
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Risalita dolce
    });
});