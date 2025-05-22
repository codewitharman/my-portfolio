// Mobile Navigation
const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Hamburger Animation
        hamburger.classList.toggle('toggle');
    });
};

// Scroll to section
const scrollToSection = () => {
    const navLinks = document.querySelectorAll('header nav ul li a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });
};

// Sticky Header
const stickyHeader = () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// Back to Top Button
const backToTop = () => {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Contact Form Submit
const contactForm = () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Normally you would send this data to a server
            // For demo, we'll just log it and show a success message
            console.log({name, email, subject, message});
            
            // Clear form fields
            form.reset();
            
            // Show success message (you could make this more sophisticated)
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
};

// Type effect for hero text
const typeEffect = () => {
    const text = document.querySelector('.hero-content h1 span');
    const fullText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < fullText.length) {
            text.textContent += fullText.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
};

function redirectToWhatsApp() {
    window.open('https://wa.me/15551234567?text=Hi,%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.%20I'm%20interested%20in%20learning%20more.%20Let's%20connect:', '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById('about');
    const slideElements = aboutSection.querySelectorAll('.slide-in-left, .slide-in-right');
    
    if (aboutSection) {
        // Initially hide elements
        slideElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)'; // or adjust based on your animation
        });
        
        // Add mouseover event listener
        aboutSection.addEventListener('mouseover', () => {
            slideElements.forEach(el => {
                el.classList.add('animate');
            });
        });
        
        // Optional: Add mouseleave to reset animation
        aboutSection.addEventListener('mouseleave', () => {
            slideElements.forEach(el => {
                el.classList.remove('animate');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    scrollToSection();
    stickyHeader();
    backToTop();
    contactForm();
    typeEffect();
});
