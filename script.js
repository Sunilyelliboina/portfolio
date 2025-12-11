// ========================================
// Navigation
// ========================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.querySelector('.nav-links');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('light-theme')) {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// ========================================
// Scroll Animations
// ========================================
const animateElements = document.querySelectorAll('.skill-category, .project-card, .contact-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ========================================
// Skill Progress Animation
// ========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.style.getPropertyValue('--progress');
            entry.target.style.width = progress;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:yelliboyinasunil@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Redirecting to your email client...');
    contactForm.reset();
});

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Navbar background on scroll
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.75rem 3rem';
    } else {
        navbar.style.padding = '1rem 3rem';
    }
});

// ========================================
// Typing effect for hero description
// ========================================
const heroDescription = document.querySelector('.hero-description');
const originalText = heroDescription.innerHTML;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    updateActiveLink();
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// ========================================
// Parallax effect for shapes
// ========================================
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// Timeline Scroll Sync & Animation
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineMarkers = document.querySelectorAll('.timeline-marker-left');

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

function syncTimeline() {
    const experienceSection = document.querySelector('.experience');
    if (!experienceSection) return;
    
    const sectionTop = experienceSection.offsetTop;
    const scrollPos = window.scrollY;
    const viewportHeight = window.innerHeight;
    const sectionStart = sectionTop - viewportHeight / 2;
    
    // Check if experience section is in view
    if (scrollPos >= sectionStart) {
        timelineItems.forEach((item, index) => {
            const itemTop = item.offsetTop + sectionTop;
            const itemHeight = item.offsetHeight;
            const itemCenter = itemTop + itemHeight / 2;
            
            // Check if item is in viewport center
            const scrollCenter = scrollPos + viewportHeight / 2;
            const distanceFromCenter = Math.abs(scrollCenter - itemCenter);
            
            if (distanceFromCenter < viewportHeight / 2.5 && timelineMarkers[index]) {
                // Highlight active marker
                timelineMarkers.forEach(marker => marker.classList.remove('active'));
                timelineMarkers[index].classList.add('active');
                
                // Add active class to timeline item
                timelineItems.forEach(ti => ti.classList.remove('active'));
                item.classList.add('active');
            }
        });
    }
}

// Throttle scroll event for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            syncTimeline();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('load', () => {
    syncTimeline();
    // Make first item visible immediately
    if (timelineItems[0]) {
        timelineItems[0].classList.add('visible');
    }
});

// ========================================
// Timeline Marker Click Handler
// ========================================
timelineMarkers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
        if (timelineItems[index]) {
            // Remove all active classes
            timelineMarkers.forEach(m => m.classList.remove('active'));
            timelineItems.forEach(ti => ti.classList.remove('active'));
            
            // Add active class to clicked marker
            marker.classList.add('active');
            timelineItems[index].classList.add('active');
            
            // Scroll to item
            const experienceSection = document.querySelector('.experience');
            const sectionTop = experienceSection.offsetTop;
            const itemTop = timelineItems[index].offsetTop + sectionTop;
            const offset = 150;
            
            window.scrollTo({
                top: itemTop - offset,
                behavior: 'smooth'
            });
        }
    });
    
    // Add hover effect
    marker.style.cursor = 'pointer';
});

// Sync timeline markers with items
function syncTimelineMarkers() {
    const experienceSection = document.querySelector('.experience');
    if (!experienceSection) return;
    
    const sectionTop = experienceSection.offsetTop;
    const scrollPos = window.scrollY;
    const viewportHeight = window.innerHeight;
    const sectionStart = sectionTop - viewportHeight / 2;
    
    if (scrollPos >= sectionStart) {
        timelineItems.forEach((item, index) => {
            const itemTop = item.offsetTop + sectionTop;
            const itemHeight = item.offsetHeight;
            const itemCenter = itemTop + itemHeight / 2;
            const scrollCenter = scrollPos + viewportHeight / 2;
            const distanceFromCenter = Math.abs(scrollCenter - itemCenter);
            
            if (distanceFromCenter < viewportHeight / 2.5 && timelineMarkers[index]) {
                timelineMarkers.forEach(m => m.classList.remove('active'));
                timelineMarkers[index].classList.add('active');
                timelineItems.forEach(ti => ti.classList.remove('active'));
                item.classList.add('active');
            }
        });
    }
}

let tickingTimeline = false;
window.addEventListener('scroll', () => {
    if (!tickingTimeline) {
        window.requestAnimationFrame(() => {
            syncTimelineMarkers();
            tickingTimeline = false;
        });
        tickingTimeline = true;
    }
});

// ========================================
// Water Drops Animation Enhancement
// ========================================
function createWaterDrop() {
    const waterDropsContainer = document.querySelector('.water-drops');
    if (!waterDropsContainer) return;
    
    const drop = document.createElement('div');
    drop.className = 'water-drop';
    
    // Random horizontal position
    const leftPosition = Math.random() * 100;
    drop.style.left = `${leftPosition}%`;
    
    // Random animation duration
    const duration = 8 + Math.random() * 5;
    drop.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 3;
    drop.style.animationDelay = `${delay}s`;
    
    waterDropsContainer.appendChild(drop);
    
    // Remove drop after animation completes
    setTimeout(() => {
        if (drop.parentNode) {
            drop.parentNode.removeChild(drop);
        }
    }, (duration + delay) * 1000);
}

// Create water drops periodically
setInterval(() => {
    if (document.querySelector('.hero')) {
        createWaterDrop();
    }
}, 2000);

// ========================================
// Resume Download Handler
// ========================================
const downloadResumeBtn = document.getElementById('downloadResume');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function(e) {
        // Resume opens in new tab - users can print to PDF using browser's print function
        // Or save as PDF directly from browser
    });
}

console.log('Portfolio loaded successfully! 🚀');

