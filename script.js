// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Form Submission with Animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Animate button
    submitBtn.style.width = submitBtn.offsetWidth + 'px';
    submitBtn.textContent = '✓';
    submitBtn.style.backgroundColor = '#22c55e';

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show success message
    setTimeout(() => {
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';

        // Clear form
        contactForm.reset();
    }, 1500);
});

// Skill Bars Animation with Counter
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const parent = bar.parentElement;
        const counter = document.createElement('div');
        counter.className = 'skill-counter';
        parent.appendChild(counter);

        let count = 0;
        const duration = 1500;
        const interval = duration / level;

        const animation = setInterval(() => {
            if (count >= level) {
                clearInterval(animation);
            } else {
                count++;
                counter.textContent = count + '%';
                bar.style.width = count + '%';
            }
        }, interval);
    });
}

// Certificate Popup with Animation
const certPopup = document.getElementById('cert-popup');
const certPopupImg = document.getElementById('cert-popup-img');
const closePopup = document.querySelector('.close-popup');

document.querySelectorAll('.certification-card').forEach(card => {
    card.addEventListener('click', () => {
        const certImage = card.getAttribute('data-cert');
        certPopupImg.src = certImage;
        certPopup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add zoom animation
        setTimeout(() => {
            certPopupImg.style.transform = 'scale(1)';
        }, 100);
    });
});

closePopup.addEventListener('click', closePopupHandler);
certPopup.addEventListener('click', (e) => {
    if (e.target === certPopup) {
        closePopupHandler();
    }
});

function closePopupHandler() {
    certPopupImg.style.transform = 'scale(0.5)';
    setTimeout(() => {
        certPopup.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

// Enhanced Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and animated elements
document.querySelectorAll('section, .animate-card').forEach(element => {
    observer.observe(element);
});

// Enhanced Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Animate text characters on hover
document.querySelectorAll('.animate-text').forEach(element => {
    const text = element.textContent;
    element.textContent = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;
        element.appendChild(span);
    });
}); 