document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    scrollToSection();
    stickyHeader();
    backToTop();
    contactForm();
    typeEffect();
    initializeBioTypewriter();
    initializeAboutAnimation();
    initializeScrollAnimations();
});



// Mobile Navigation
const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (hamburger && nav) {
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
    }
};

// Scroll to section functionality
const scrollToSection = () => {
    const navLinks = document.querySelectorAll('header nav ul li a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                const nav = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
            }
        });
    });
};


// Sticky Header
const stickyHeader = () => {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
};

// Back to Top Button
const backToTop = () => {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
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
    }
};

// ===== FORM FUNCTIONS =====

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
            console.log({
                name: name,
                email: email,
                subject: subject,
                message: message
            });
            
            // Clear form fields
            form.reset();
            
            // Show success message (you could make this more sophisticated)
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
};

// ===== TEXT ANIMATION FUNCTIONS =====

// Type effect for hero text
const typeEffect = () => {
    const text = document.querySelector('.hero-content h1 span');
    
    if (text) {
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
    }
};

// Bio typewriter effect
const initializeBioTypewriter = () => {
    const bioElement = document.getElementById('bio-text');
    
    if (bioElement) {
        const originalText = bioElement.textContent;
        
        // Clear the element's content
        bioElement.textContent = '';
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        bioElement.appendChild(cursor);
        
        let charIndex = 0;
        const typingSpeed = 40; // milliseconds per character
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                // Create a text node before the cursor
                bioElement.insertBefore(
                    document.createTextNode(originalText.charAt(charIndex)),
                    cursor
                );
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
};

// ===== ANIMATION FUNCTIONS =====

// About section slide animation
const initializeAboutAnimation = () => {
    const aboutSection = document.getElementById('about');

    if (!aboutSection) return;

    const slideElements = aboutSection.querySelectorAll('.slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    slideElements.forEach(el => el.classList.add('animate'));
                    observer.unobserve(aboutSection);
                }
            });
        },
        {
            threshold: 0.3 // 30% of section is visible
        }
    );

    observer.observe(aboutSection);
};

const initializeScrollAnimations = () => {
    const animatedSections = document.querySelectorAll('.slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // animate once
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    animatedSections.forEach(section => observer.observe(section));
};

// Call this inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
});



// ===== UTILITY FUNCTIONS =====

// WhatsApp redirect function
function redirectToWhatsApp() {
    const phoneNumber = "917715867323"; 
    const message = "Hi, I came across your portfolio and wanted to reach out. I'm interested in learning more. Let's connect.";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
}



// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for resize events
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    const slides = document.getElementsByClassName("slide");
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            plusSlides(-1);
        } else if (e.key === 'ArrowRight') {
            plusSlides(1);
        }
    }
});

// Focus management for mobile menu
const manageFocus = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                const firstLink = nav.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });
    }
};

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

// ===== CONSOLE LOG FOR DEBUGGING =====
console.log('Script.js loaded successfully!');
console.log('All functions initialized and ready to use.');
