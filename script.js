// Projects Data Management
let projectsData = null;

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects data');
        }
        projectsData = await response.json();
        renderFeaturedProjects();
        console.log('Projects loaded successfully');
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to hardcoded projects if JSON fails
        loadFallbackProjects();
    }
}

// Fallback projects data
function loadFallbackProjects() {
    projectsData = {
        projects: [
            {
                id: "smart-campus",
                title: "Smart Campus Network",
                description: "IoT-enabled campus monitoring system with real-time data analytics.",
                placeholder: "Smart Campus",
                status: "active",
                category: "IoT Systems",
                featured: true,
                detailPage: "project-smart-campus.html"
            },
            {
                id: "ai-assistant",
                title: "AI Learning Assistant",
                description: "Machine learning powered educational companion for students.",
                placeholder: "AI Assistant",
                status: "development",
                category: "AI/ML",
                featured: true,
                detailPage: "project-ai-assistant.html"
            },
            {
                id: "energy-monitor",
                title: "Sustainable Energy Monitor",
                description: "Real-time energy consumption tracking and optimization system.",
                placeholder: "Green Tech",
                status: "planning",
                category: "Sustainability",
                featured: true,
                detailPage: "project-energy-monitor.html"
            }
        ]
    };
    renderFeaturedProjects();
}

// Render featured projects on homepage
function renderFeaturedProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid || !projectsData) return;

    const featuredProjects = projectsData.projects.filter(project => project.featured);
    
    projectsGrid.innerHTML = featuredProjects.map(project => `
        <div class="project-card" data-category="${project.category}" data-status="${project.status}">
            <div class="project-image">
                <div class="project-placeholder">${project.placeholder}</div>
                <div class="project-status ${project.status}">${getStatusLabel(project.status)}</div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.detailPage}" class="btn-outline">View Project</a>
            </div>
        </div>
    `).join('');
}

// Get status label
function getStatusLabel(status) {
    const statusLabels = {
        'active': 'Active',
        'development': 'In Development',
        'planning': 'Planning',
        'completed': 'Completed',
        'on-hold': 'On Hold'
    };
    return statusLabels[status] || status;
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
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

// Apple-style scroll effects and animations
let lastScrollY = window.scrollY;
let ticking = false;

// IoT Animation Management
document.addEventListener('DOMContentLoaded', function() {
    const iotObjects = document.querySelectorAll('.iot-object');
    const logoLetters = document.querySelectorAll('.logo-letter');
    
    // Add interactive hover effects for IoT objects
    iotObjects.forEach((object, index) => {
        object.addEventListener('mouseenter', function() {
            // Pulse effect on hover
            this.style.transform = 'scale(1.2)';
            this.style.background = 'rgba(102, 126, 234, 0.3)';
            
            // Trigger connecting letters animation
            logoLetters.forEach((letter, letterIndex) => {
                setTimeout(() => {
                    letter.style.transform = 'scale(1.1) rotateY(15deg)';
                    letter.style.textShadow = '0 0 50px rgba(102, 126, 234, 0.8)';
                }, letterIndex * 50);
            });
        });
        
        object.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
            
            // Reset letters
            logoLetters.forEach((letter) => {
                letter.style.transform = '';
                letter.style.textShadow = '';
            });
        });
    });
    
    // Letter click effects
    logoLetters.forEach((letter, index) => {
        letter.addEventListener('click', function() {
            // Ripple effect through all objects
            iotObjects.forEach((object, objIndex) => {
                setTimeout(() => {
                    object.style.animation = 'none';
                    object.offsetHeight; // Trigger reflow
                    object.style.animation = 'objectFloat 1s ease-in-out';
                }, objIndex * 100);
            });
        });
    });
});

// Parallax effects for IoT animation
function updateScrollEffects() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for IoT animation container with 3D transform
    const iotContainer = document.querySelector('.iot-animation-container');
    if (iotContainer) {
        const speed = 0.2;
        const yPos = -(scrollY * speed);
        const rotation = scrollY * 0.02;
        iotContainer.style.transform = `translate3d(0, ${yPos}px, 0) rotateX(${rotation}deg)`;
    }
    
    // Individual IoT objects parallax
    const iotObjects = document.querySelectorAll('.iot-object');
    iotObjects.forEach((object, index) => {
        const speed = 0.1 + (index * 0.02);
        const yPos = -(scrollY * speed);
        const rotation = scrollY * 0.05;
        object.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
    });
    
    // Logo letters parallax
    const logoLetters = document.querySelectorAll('.logo-letter');
    logoLetters.forEach((letter, index) => {
        const speed = 0.15 + (index * 0.01);
        const yPos = -(scrollY * speed);
        letter.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    // Parallax background for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroOffset = scrollY * 0.5;
        hero.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
    }
    
    // Section reveal animations with Apple-style easing
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
            section.classList.add('in-view');
            
            // Animate section headers
            const header = section.querySelector('.section-header');
            if (header && !header.classList.contains('animate')) {
                setTimeout(() => {
                    header.classList.add('animate');
                }, index * 100);
            }
            
            // Animate cards with stagger
            const cards = section.querySelectorAll('.about-card, .project-card, .event-item, .team-card');
            cards.forEach((card, cardIndex) => {
                if (!card.classList.contains('animate')) {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, (index * 100) + (cardIndex * 150));
                }
            });
        }
    });
    
    // Enhanced navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Apple-style scroll listener with throttling
window.addEventListener('scroll', requestTick, { passive: true });

// Enhanced Intersection Observer for more complex animations
const advancedObserverOptions = {
    threshold: [0, 0.1, 0.2, 0.5, 0.8],
    rootMargin: '0px 0px -50px 0px'
};

const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        const ratio = entry.intersectionRatio;
        
        if (entry.isIntersecting) {
            // Progressive animation based on intersection ratio
            const opacity = Math.min(ratio * 1.5, 1);
            const translateY = Math.max(30 - (ratio * 50), 0);
            const scale = 0.95 + (ratio * 0.05);
            
            element.style.opacity = opacity;
            element.style.transform = `translateY(${translateY}px) scale(${scale})`;
        }
    });
}, advancedObserverOptions);

// Enhanced DOMContentLoaded with Apple-style animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll effects
    updateScrollEffects();
    
    // Staggered loading animation for elements
    const animateElements = document.querySelectorAll('.about-card, .project-card, .event-item, .team-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        advancedObserver.observe(el);
    });
    
    // Apple-style magnetic buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Apple-style card tilt effect
    const cards = document.querySelectorAll('.about-card, .project-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Apple-style typing effect with cursor
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            typeWriterEffect(heroTitle, originalHTML, 30);
        }, 800);
    }
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add close button styles
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: 8px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll('.floating-elements .element');
    
    heroElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Apple-style micro-interactions and finishing touches
document.addEventListener('DOMContentLoaded', () => {
    // Add Apple-style ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple animation styles
    if (!document.querySelector('#ripple-styles')) {
        const styles = document.createElement('style');
        styles.id = 'ripple-styles';
        styles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Apply ripple effect to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Apple-style smooth reveal for page load
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Apple-style elastic scroll behavior
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            document.body.style.transform = 'scale(0.999)';
            isScrolling = true;
        }
        
        clearTimeout(window.scrollTimer);
        window.scrollTimer = setTimeout(() => {
            document.body.style.transform = 'scale(1)';
            isScrolling = false;
        }, 150);
    });
});

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced typing effect with Apple-style cursor
function typeWriterEffect(element, html, speed = 50) {
    let i = 0;
    const text = html.replace(/<[^>]*>/g, ''); // Remove HTML tags for typing
    element.innerHTML = '';
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.style.cssText = `
        display: inline-block;
        background: var(--accent-color);
        width: 3px;
        height: 1.2em;
        margin-left: 2px;
        animation: blink 1s infinite;
    `;
    
    // Add cursor animation styles
    if (!document.querySelector('#cursor-styles')) {
        const styles = document.createElement('style');
        styles.id = 'cursor-styles';
        styles.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            
            // Re-apply HTML formatting
            if (i === text.length - 1) {
                element.innerHTML = html;
            }
            
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed + Math.random() * 50); // Variable speed for naturalness
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 1000);
        }
    }
    
    type();
}

// Add dynamic background particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${3 + Math.random() * 2}s infinite;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Add CSS for particle animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add mobile menu styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 122, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Add hover effects for interactive elements
document.querySelectorAll('a, button, .about-card, .project-card, .team-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 122, 255, 0.6)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(0, 122, 255, 0.3)';
        }
    });
});
