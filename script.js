
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-up');
    const header = document.querySelector('header');
    const hero = document.querySelector('#hero');

    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    const showOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        faders.forEach(fader => {
            const faderTop = fader.getBoundingClientRect().top;
            if (faderTop < triggerBottom) {
                fader.classList.add('show');
            }
        });
    };

    // Navbar Background Logic
    const handleNavbar = () => {
        if (!header) return;

        if (hero) {
            // Homepage: Transparent over hero, White after
            const heroBottom = hero.offsetTop + hero.offsetHeight - 70; // 70px buffer for smooth transition
            if (window.scrollY > heroBottom) {
                header.classList.add('light-section');
            } else {
                header.classList.remove('light-section');
            }
        } else {
            // Other pages: Always white (light-section)
            // This ensures text is visible on light backgrounds (since default is white text)
            header.classList.add('light-section');
        }
    };

    // Combined scroll handler
    const handleScroll = () => {
        showOnScroll();
        handleNavbar();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
        });
    });
});
