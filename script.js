
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-up');
    const header = document.querySelector('header');
    const hero = document.querySelector('#hero, .about-hero, .projects-hero, .contact-hero');

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

    // Mobile Menu Logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const menuIcon = document.querySelector('.mobile-menu-btn i');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');

            // Toggle icon
            if (nav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

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
            // Pages with Hero: Transparent over hero, White after
            const heroBottom = hero.offsetTop + hero.offsetHeight - 70; // 70px buffer for smooth transition
            if (window.scrollY > heroBottom) {
                header.classList.add('light-section');
            } else {
                header.classList.remove('light-section');
            }
        } else {
            // Fallback (e.g. Contact if no hero yet): Always white (light-section)
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
