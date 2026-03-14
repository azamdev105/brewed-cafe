const sidebar = document.querySelector('.sidebar');
const hamburger = document.querySelector('#hamburger');
const close = document.querySelector('#close');
const sidebarLinks = document.querySelectorAll('.sidebar a');

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.style.display = 'block';
});

close.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    });
});

// threshold lowered from 0.1 to 0.05 — elements reveal sooner, less delay when scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-rotate, .reveal-scale').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const scrollTop = document.querySelector('#scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});