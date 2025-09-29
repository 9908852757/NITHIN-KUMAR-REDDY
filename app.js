// Portfolio JavaScript for Nithin Kumar Reddy

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeImageLoading();
    initializeSkillBars();
    initializeTestimonialFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeProfessionalEffects();
});

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation link
                updateActiveNavLink(link);
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLinkOnScroll, 100));
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Clean Image Loading without text overlays
function initializeImageLoading() {
    const profileImages = document.querySelectorAll('.profile-image');
    
    profileImages.forEach((img, index) => {
        // Set initial styling for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        // Create a test to see if image exists
        const testImg = new Image();
        testImg.onload = function() {
            // Image exists and loaded successfully
            img.style.opacity = '1';
        };
        
        testImg.onerror = function() {
            // Image doesn't exist or failed to load - show clean gradient fallback
            const container = img.closest('.photo-container');
            if (container) {
                // Hide the img element completely
                img.style.display = 'none';
                // Add fallback class to show gradient background
                img.classList.add('fallback');
                container.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-teal-400), var(--color-primary-hover))';
                container.style.backgroundSize = '200% 200%';
                container.style.animation = 'gradientShift 4s ease-in-out infinite';
            }
        };
        
        // Set the test image source to the same as the main image
        testImg.src = img.src;
        
        // Also handle the original img element events
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            const container = img.closest('.photo-container');
            if (container) {
                img.style.display = 'none';
                img.classList.add('fallback');
                container.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-teal-400), var(--color-primary-hover))';
                container.style.backgroundSize = '200% 200%';
                container.style.animation = 'gradientShift 4s ease-in-out infinite';
            }
        });
        
        // Trigger load event if image is already cached
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else if (img.complete) {
            // Image is complete but failed to load
            img.dispatchEvent(new Event('error'));
        }
    });
}

// Skill Bar Animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.getAttribute('data-percentage');
                
                // Animate skill bar
                setTimeout(() => {
                    skillBar.style.width = percentage + '%';
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Testimonial Filter Functions
function initializeTestimonialFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter testimonials with smooth animation
            testimonialCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.classList.add('hidden');
                            }
                        }, 300);
                    }
                }, index * 100);
            });
        });
    });
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactFormSubmit(contactForm);
        });

        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showSuccessMessage('Thank you for your message! I will get back to you within 24 hours.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear any field errors
        clearAllFieldErrors(form);
    }, 2000);
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long.');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address.');
    }
    
    if (!data.subject) {
        errors.push('Please select a subject.');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long.');
    }
    
    if (errors.length > 0) {
        showError(errors.join(' '));
        return false;
    }
    
    return true;
}

function validateField(field) {
    const value = field.value.trim();
    let error = '';
    
    switch (field.type) {
        case 'text':
            if (field.name === 'name' && value.length < 2) {
                error = 'Name must be at least 2 characters long.';
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                error = 'Please enter a valid email address.';
            }
            break;
        case 'select-one':
            if (!value) {
                error = 'Please select an option.';
            }
            break;
        case 'textarea':
            if (value.length < 10) {
                error = 'Message must be at least 10 characters long.';
            }
            break;
    }
    
    if (error) {
        showFieldError(field, error);
        return false;
    } else {
        clearFieldError(field);
        return true;
    }
}

function showFieldError(field, error) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = error;
    errorDiv.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'var(--color-error)';
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '';
}

function clearAllFieldErrors(form) {
    const errorDivs = form.querySelectorAll('.field-error');
    errorDivs.forEach(div => div.remove());
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.style.borderColor = '');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: var(--color-white);
        padding: var(--space-16) var(--space-20);
        border-radius: var(--radius-base);
        z-index: 10000;
        box-shadow: var(--shadow-lg);
        font-weight: var(--font-weight-medium);
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: var(--space-8);
    `;
    
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
        successDiv.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(100%)';
        successDiv.style.opacity = '0';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 300);
    }, 5000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-error);
        color: var(--color-white);
        padding: var(--space-16) var(--space-20);
        border-radius: var(--radius-base);
        z-index: 10000;
        box-shadow: var(--shadow-lg);
        font-weight: var(--font-weight-medium);
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: var(--space-8);
    `;
    
    document.body.appendChild(errorDiv);
    
    // Animate in
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(0)';
        errorDiv.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(100%)';
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.stat-card, .skill-category, .experience-item, .testimonial-card, .contact-item, .highlight-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Professional Effects
function initializeProfessionalEffects() {
    // Animate hero elements on load
    animateHeroElements();
    
    // Add professional hover effects
    addProfessionalHoverEffects();
    
    // Initialize typing effect for tagline
    initializeTypingEffect();
    
    // Initialize parallax effects
    initializeParallaxEffects();
}

function animateHeroElements() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-location');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
    
    // Animate profile photo containers
    const profileContainers = document.querySelectorAll('.profile-photo-frame');
    profileContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.8)';
        container.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 600 + (index * 200));
    });
}

function addProfessionalHoverEffects() {
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.stat-card, .skill-category, .testimonial-card, .experience-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-sm)';
        });
    });
    
    // Professional photo hover effects
    const photoContainers = document.querySelectorAll('.profile-photo-frame');
    photoContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.05)';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
        });
    });
}

function initializeTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    
    setTimeout(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            tagline.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    }, 1200);
}

function initializeParallaxEffects() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.5;
                heroSection.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
    }, 16));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key for any modals or overlays
    if (e.key === 'Escape') {
        // Close any open mobile menu
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Section reveal on scroll
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Page loading animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth navbar background transition
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(var(--color-surface), 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(var(--color-background), 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
}, 16));

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on content
        if (element.textContent.includes('%')) {
            element.textContent = Math.round(current) + '%';
        } else if (element.textContent.includes('+')) {
            element.textContent = Math.round(current) + '+';
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Initialize stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
                statNumber.textContent = '0' + text.replace(/\d/g, '');
                animateCounter(statNumber, number);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.7 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Console welcome message
console.log(`
🎯 Nithin Kumar Reddy Nalavolu Portfolio
👋 Welcome to my professional portfolio!
📧 Contact: nithinreddynalavolu@gmail.com
📱 Phone: +91-9908852757
🔗 LinkedIn: https://www.linkedin.com/in/rnithinkumar043/
🌟 Professional Customer Service Excellence & Team Leadership
`);

// Export functions for potential external use
window.PortfolioApp = {
    updateActiveNavLink,
    showError,
    showSuccessMessage,
    isValidEmail,
    animateCounter
};