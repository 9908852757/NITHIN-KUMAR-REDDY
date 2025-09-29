// Portfolio JavaScript for Nithin Kumar Reddy - Simple Image Loading

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSimpleImageLoading();
    initializeSkillBars();
    initializeTestimonialFilters();
    initializeContactForm();
    initializeScrollAnimations();
});

// Simple Image Loading Functions
function initializeSimpleImageLoading() {
    // Initialize image loading status display
    updateImageLoadingStatus();
    
    // Add loading class initially
    const imageContainers = document.querySelectorAll('.profile-photo-container');
    imageContainers.forEach(container => {
        container.classList.add('image-loading');
    });
}

// Called from HTML onerror attribute
function showImageFallback(section) {
    const fallback = document.getElementById(`${section}Fallback`);
    const photo = document.getElementById(`${section}Photo`);
    const container = photo.closest('.profile-photo-container');
    
    // Show fallback, hide image
    fallback.classList.remove('hidden');
    photo.classList.add('error');
    container.classList.remove('image-loading');
    
    // Update status
    console.log(`Image not found: ${section === 'hero' ? 'profile1.jpg' : 'profile2.jpg'}`);
    
    // Add helpful message to fallback
    const instruction = fallback.querySelector('.photo-instruction');
    if (instruction) {
        instruction.textContent = `${section === 'hero' ? 'profile1.jpg' : 'profile2.jpg'} not found - Add image to load photo`;
        instruction.style.color = 'var(--color-error)';
        instruction.style.borderColor = 'var(--color-error)';
    }
}

// Called from HTML onload attribute  
function hideImageFallback(section) {
    const fallback = document.getElementById(`${section}Fallback`);
    const photo = document.getElementById(`${section}Photo`);
    const container = photo.closest('.profile-photo-container');
    
    // Hide fallback, show image
    fallback.classList.add('hidden');
    photo.classList.remove('error');
    container.classList.remove('image-loading');
    
    // Success status
    console.log(`✅ Image loaded successfully: ${section === 'hero' ? 'profile1.jpg' : 'profile2.jpg'}`);
    
    // Add smooth fade-in effect
    photo.style.opacity = '0';
    setTimeout(() => {
        photo.style.opacity = '1';
        photo.style.transition = 'opacity 0.5s ease-in-out';
    }, 10);
}

function updateImageLoadingStatus() {
    // Display helpful information in console
    console.log(`
📸 SIMPLE IMAGE LOADING GUIDE:
1. Add "profile1.jpg" to this folder for hero section
2. Add "profile2.jpg" to this folder for about section  
3. Images load automatically - no upload needed!
4. Professional fallbacks show if images not found
    `);
}

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
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
    window.addEventListener('scroll', () => {
        updateActiveNavLinkOnScroll();
    });
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

// Skill Bar Animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.getAttribute('data-percentage');
                skillBar.style.width = percentage + '%';
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
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
            
            // Filter testimonials
            testimonialCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
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
            });
        });
    });
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleContactFormSubmit(contactForm);
    });
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
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showSuccessMessage('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Create a simple error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-error);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateX(100%)';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .skill-category, .experience-item, .testimonial-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
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

// Performance optimizations
const debouncedScrollHandler = debounce(updateActiveNavLinkOnScroll, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// Image retry functionality
function retryImageLoad(section) {
    const photo = document.getElementById(`${section}Photo`);
    const fallback = document.getElementById(`${section}Fallback`);
    const container = photo.closest('.profile-photo-container');
    
    // Add loading state
    container.classList.add('image-loading');
    fallback.classList.add('hidden');
    photo.classList.remove('error');
    
    // Force reload
    const currentSrc = photo.src;
    photo.src = '';
    setTimeout(() => {
        photo.src = currentSrc + '?' + Date.now(); // Cache busting
    }, 100);
}

// Add retry buttons to fallbacks
document.addEventListener('DOMContentLoaded', () => {
    const fallbacks = document.querySelectorAll('.profile-photo-fallback');
    fallbacks.forEach(fallback => {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn--outline btn--sm';
        retryBtn.textContent = 'Retry Load';
        retryBtn.style.cssText = `
            margin-top: var(--space-12);
            font-size: var(--font-size-xs);
            padding: var(--space-6) var(--space-12);
        `;
        
        retryBtn.addEventListener('click', () => {
            const section = fallback.id.replace('Fallback', '');
            retryImageLoad(section);
        });
        
        fallback.appendChild(retryBtn);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key functionality for accessibility
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (navToggle.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        // Focus management for better accessibility
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input[type="text"], input[type="email"], select'
        );
        
        // Add focus outline for keyboard users
        focusableElements.forEach(element => {
            if (!element.hasAttribute('data-focus-listener')) {
                element.setAttribute('data-focus-listener', 'true');
                
                element.addEventListener('focus', () => {
                    element.style.outline = '2px solid var(--color-primary)';
                    element.style.outlineOffset = '2px';
                });
                
                element.addEventListener('blur', () => {
                    element.style.outline = '';
                    element.style.outlineOffset = '';
                });
            }
        });
    }
});

// Smooth reveal animations for sections
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

// Add loading states and transitions
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize hero text animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
    
    // Check image loading status after page load
    setTimeout(() => {
        checkImageLoadingStatus();
    }, 1000);
});

function checkImageLoadingStatus() {
    const heroPhoto = document.getElementById('heroPhoto');
    const aboutPhoto = document.getElementById('aboutPhoto');
    
    let loadedCount = 0;
    let totalImages = 2;
    
    if (!heroPhoto.classList.contains('error')) loadedCount++;
    if (!aboutPhoto.classList.contains('error')) loadedCount++;
    
    console.log(`📸 Image Loading Summary: ${loadedCount}/${totalImages} images loaded successfully`);
    
    if (loadedCount === 0) {
        console.log(`
⚠️  No images found!
📝 Quick setup guide:
   1. Add "profile1.jpg" to this folder for hero section
   2. Add "profile2.jpg" to this folder for about section
   3. Refresh the page to see images load
        `);
    } else if (loadedCount < totalImages) {
        console.log(`
✅ Some images loaded! 
📝 To complete setup:
   ${heroPhoto.classList.contains('error') ? '• Add "profile1.jpg" for hero section' : ''}
   ${aboutPhoto.classList.contains('error') ? '• Add "profile2.jpg" for about section' : ''}
        `);
    } else {
        console.log('✅ All images loaded successfully! Portfolio is ready.');
    }
}

// Error handling for general images
document.addEventListener('DOMContentLoaded', () => {
    const allImages = document.querySelectorAll('img:not(.profile-photo)');
    allImages.forEach(img => {
        img.addEventListener('error', (e) => {
            console.warn('Image failed to load:', e.target.src);
        });
    });
});

// Console welcome message with simple instructions
console.log(`
🎯 Nithin Kumar Reddy Nalavolu Portfolio - Simple Image Loading
👋 Welcome to the professional portfolio!
📧 Contact: nithinreddynalavolu@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/rnithinkumar043/

📸 EASY IMAGE SETUP:
   1. Add "profile1.jpg" to this folder
   2. Add "profile2.jpg" to this folder  
   3. That's it! No upload system needed.
   
✨ Features: Professional fallbacks, error handling, retry buttons
`);

// Export functions for potential external use and global access
window.PortfolioApp = {
    showImageFallback,
    hideImageFallback,
    retryImageLoad,
    updateActiveNavLink,
    showError,
    showSuccessMessage,
    isValidEmail,
    checkImageLoadingStatus
};

// Make image functions globally available for HTML onclick handlers
window.showImageFallback = showImageFallback;
window.hideImageFallback = hideImageFallback;