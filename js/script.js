// ========================================
// PERFECT PAGE FREIGHT - COMPLETE JAVASCRIPT
// ========================================
// ========================================
// 0. PREMIUM LOADER WITH MOTTO
// ========================================

(function() {
    'use strict';
    
    // Wait for everything to load
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        
        if (loader) {
            // Add a small delay for a smoother experience
            setTimeout(function() {
                loader.classList.add('fade-out');
                
                // Remove loader from DOM after animation
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 800);
            }, 800); // Minimum display time: 800ms
        }
    });
    
    // Fallback: Hide loader after 5 seconds if something breaks
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 800);
        }
    }, 5000);
    
})();

document.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
    
    // ========================================
    // 1. MOBILE HAMBURGER MENU - FIXED
    // ========================================
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // ========================================
    // 2. MOBILE DROPDOWN TOGGLE
    // ========================================
    
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                // Only on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Close mobile menu on click outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
    
    // ========================================
    // 3. HEADER SCROLL EFFECT
    // ========================================
    
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // 4. COUNTER ANIMATION
    // ========================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    animateCounter(target, countTo);
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    } else {
        statNumbers.forEach(stat => {
            const countTo = parseInt(stat.getAttribute('data-count'));
            stat.textContent = countTo + '+';
        });
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 1500;
        const steps = Math.ceil(duration / 16);
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps || current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = current + '+';
        }, 16);
    }
    
    // ========================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // 6. ACTIVE NAV LINK HIGHLIGHT
    // ========================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
    
// ========================================
// 7. FORM VALIDATION & SUBMISSION - WITH DEBUGGING
// ========================================

const quoteForm = document.getElementById('quoteForm');
const contactForm = document.getElementById('contactForm');

// Function to validate form
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#EF4444';
            errorMsg.style.fontSize = '13px';
            errorMsg.style.marginTop = '4px';
            errorMsg.textContent = 'This field is required';
            field.parentElement.appendChild(errorMsg);
        }
        
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                field.classList.add('error');
                
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = 'Please enter a valid email address';
                } else {
                    const newError = document.createElement('span');
                    newError.className = 'error-message';
                    newError.style.color = '#EF4444';
                    newError.style.fontSize = '13px';
                    newError.style.marginTop = '4px';
                    newError.textContent = 'Please enter a valid email address';
                    field.parentElement.appendChild(newError);
                }
            }
        }
        
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+\d\s\-\(\)]{8,20}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                field.classList.add('error');
                
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = 'Please enter a valid phone number';
                } else {
                    const newError = document.createElement('span');
                    newError.className = 'error-message';
                    newError.style.color = '#EF4444';
                    newError.style.fontSize = '13px';
                    newError.style.marginTop = '4px';
                    newError.textContent = 'Please enter a valid phone number';
                    field.parentElement.appendChild(newError);
                }
            }
        }
    });
    
    return isValid;
}

// ========================================
// QUOTE FORM - WITH DEBUGGING
// ========================================

if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(this)) {
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(this);
        
        // Log what's being sent (for debugging)
        console.log('Sending form data:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Response data:', data);
            
            // Check if the response contains success indicators
            if (data.includes('success') || data.includes('ok') || data.includes('Thank you')) {
                // Hide form, show success message
                this.style.display = 'none';
                const successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                this.reset();
            } else {
                // Try parsing as JSON
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData.success) {
                        this.style.display = 'none';
                        const successMsg = document.getElementById('successMessage');
                        if (successMsg) {
                            successMsg.style.display = 'block';
                        }
                        this.reset();
                    } else {
                        throw new Error('Server returned error: ' + jsonData.message);
                    }
                } catch (e) {
                    // If it's HTML response, assume success (FormSubmit returns HTML)
                    this.style.display = 'none';
                    const successMsg = document.getElementById('successMessage');
                    if (successMsg) {
                        successMsg.style.display = 'block';
                    }
                    this.reset();
                }
            }
            
            submitBtn.innerHTML = '✓ Sent Successfully!';
            submitBtn.style.background = '#10B981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            submitBtn.innerHTML = '❌ Failed to Send';
            submitBtn.style.background = '#EF4444';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}

// ========================================
// CONTACT FORM - WITH DEBUGGING
// ========================================

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(this)) {
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(this);
        
        // Log what's being sent (for debugging)
        console.log('Sending contact form data:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Response data:', data);
            
            // Check if the response contains success indicators
            if (data.includes('success') || data.includes('ok') || data.includes('Thank you')) {
                this.style.display = 'none';
                const successMsg = document.getElementById('contactSuccessMessage');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                this.reset();
            } else {
                // Try parsing as JSON
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData.success) {
                        this.style.display = 'none';
                        const successMsg = document.getElementById('contactSuccessMessage');
                        if (successMsg) {
                            successMsg.style.display = 'block';
                        }
                        this.reset();
                    } else {
                        throw new Error('Server returned error: ' + jsonData.message);
                    }
                } catch (e) {
                    // If it's HTML response, assume success (FormSubmit returns HTML)
                    this.style.display = 'none';
                    const successMsg = document.getElementById('contactSuccessMessage');
                    if (successMsg) {
                        successMsg.style.display = 'block';
                    }
                    this.reset();
                }
            }
            
            submitBtn.innerHTML = '✓ Sent Successfully!';
            submitBtn.style.background = '#10B981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            submitBtn.innerHTML = '❌ Failed to Send';
            submitBtn.style.background = '#EF4444';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}    // ========================================
    // 8. SCROLL REVEAL ANIMATIONS
    // ========================================
    
    const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .why-choose-list li, .stat-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        revealObserver.observe(el);
    });
    
    // ========================================
    // 9. WHATSAPP BUTTON TRACKING
    // ========================================
    
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp button clicked - chat initiated');
        });
    }
    
    // ========================================
    // 10. CONSOLE BRANDING
    // ========================================
    
    console.log('%c Perfect Page Freight Logistics ', 'background: #0A1628; color: #60A5FA; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Reliable Freight Forwarder | Your Success Our Priority ', 'color: #1F2937; font-size: 14px;');
    console.log('📧 info@perfectpagefreight.com | 📞 +233 24 535 9395');
    
});

// ========================================
// HANDLE WINDOW RESIZE
// ========================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
            const dropdowns = document.querySelectorAll('.dropdown.active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250);
});