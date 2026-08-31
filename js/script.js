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
    // 7. FORM VALIDATION & SUBMISSION
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
    
    // Quote Form Handler
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
                
                submitBtn.innerHTML = 'Sent Successfully';
                submitBtn.style.background = '#10B981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                submitBtn.innerHTML = 'Failed to Send';
                submitBtn.style.background = '#EF4444';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
    
    // Contact Form Handler
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
                
                submitBtn.innerHTML = 'Sent Successfully';
                submitBtn.style.background = '#10B981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                submitBtn.innerHTML = 'Failed to Send';
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
    console.log('Email: info@perfectpagefreight.com | Phone: +233 24 535 9395');
    
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

// ========================================
// CHATBOT - COMPLETE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // DOM Elements
    const toggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const close = document.getElementById('chatbotClose');
    const input = document.getElementById('chatbotInput');
    const send = document.getElementById('chatbotSend');
    const messages = document.getElementById('chatbotMessages');
    const typing = document.getElementById('typingIndicator');
    
    let isOpen = false;
    let isTyping = false;
    
    // ========================================
    // KNOWLEDGE BASE
    // ========================================
    
    const responses = {
        // Greetings
        'hello': 'Hello and welcome to Perfect Page Freight Logistics. How can I help you today?',
        'hi': 'Hello. How can I assist you with your freight needs?',
        'hey': 'Welcome to Perfect Page Freight Logistics. What can I do for you?',
        'good morning': 'Good morning. How can I help you with your freight needs today?',
        'good afternoon': 'Good afternoon. How can I assist you with your logistics needs?',
        'good evening': 'Good evening. How can I help you with your freight requirements?',
        
        // Services
        'services': 'We offer three main services:\n\nSea Freight - FCL and LCL container shipping worldwide\nAir Freight - Express cargo services globally\nLand Transport - Road freight across Ghana and West Africa',
        'sea freight': 'Sea Freight Services\n\nWe offer:\n- FCL (Full Container Load)\n- LCL (Less than Container Load)\n- Door-to-door delivery\n- Customs clearance\n- Global port coverage',
        'air freight': 'Air Freight Services\n\nWe offer:\n- Express air cargo\n- Door-to-door delivery\n- Airport-to-airport\n- Real-time tracking\n- Worldwide destinations',
        'land transport': 'Land Transport Services\n\nWe offer:\n- Full Truckload (FTL)\n- Less-than-Truckload (LTL)\n- West Africa regional transport\n- GPS tracking\n- Reliable delivery',
        'customs': 'Customs Clearance\n\nWe handle:\n- Documentation preparation\n- Duty calculations\n- Compliance checks\n- Fast clearance\n\nOur experts ensure your cargo clears customs smoothly.',
        
        // Quotes
        'quote': 'To get a quote, please visit our Quote Request page or provide your cargo details and we will get back to you within 24 hours.',
        'price': 'Pricing depends on:\n\n- Type of cargo\n- Weight and volume\n- Destination\n- Service level (air, sea, or land)\n\nFor an accurate quote, please visit our Quote page.',
        'cost': 'Shipping costs vary based on several factors. For a personalized quote, please visit our Quote Request page.',
        
        // Delivery
        'delivery': 'Estimated Delivery Times\n\n- Air Freight: 2-5 days\n- Sea Freight: 2-6 weeks\n- Land Transport: 1-7 days\n\nExact times depend on the destination. Contact us for specific routes.',
        'time': 'Delivery times vary by service:\n\n- Air: 2-5 business days\n- Sea: 2-6 weeks\n- Land: 1-7 days\n\nNeed something urgent? Air freight is your best option.',
        
        // Tracking
        'track': 'Shipment Tracking\n\nWe are currently developing a real-time tracking system.\n\nIn the meantime, you can:\n- Contact us directly\n- Email: info@perfectpagefreight.com\n- Call: +233 24 535 9395',
        'tracking': 'Tracking Information\n\nOur tracking system is coming soon. Until then:\n\nEmail: info@perfectpagefreight.com\nPhone: +233 24 535 9395\nWhatsApp: +233 24 535 9395',
        
        // Contact
        'contact': 'Contact Us\n\nEmail: info@perfectpagefreight.com\nPhone: +233 24 535 9395\nWhatsApp: +233 24 535 9395\nLocation: Accra, Ghana\n\nWe are available Monday-Friday, 8am-6pm.',
        'phone': 'You can reach us at:\n\nPhone: +233 24 535 9395\nWhatsApp: +233 24 535 9395\n\nWe are available Monday-Friday, 8am-6pm.',
        'email': 'Email us at:\n\ninfo@perfectpagefreight.com\n\nWe will respond within 24 hours.',
        'location': 'Our Location\n\nWe are based in Accra, Ghana.\n\nVisit our Contact page for the Google Maps location.',
        'whatsapp': 'Chat with us on WhatsApp:\n\n+233 24 535 9395\n\nClick the WhatsApp button on our website to start chatting.',
        
        // About
        'about': 'About Perfect Page Freight\n\n- Founded in 2015\n- 15+ years experience\n- Trusted freight forwarder in Ghana\n- Sea, Air and Land services\n- Motto: "Your Success, Our Priority"\n\nVisit our About page to learn more.',
        'company': 'Company Info\n\n- Name: Perfect Page Freight Logistics\n- Founded: 2015\n- Location: Accra, Ghana\n- Services: Sea, Air and Land Freight\n- Fully registered and licensed',
        'experience': 'Experience\n\nWe have 15+ years of combined experience in freight forwarding and logistics.',
        
        // FAQ
        'faq': 'FAQ Categories\n\n- General Questions\n- Shipping and Delivery\n- Customs and Documentation\n- Business Information\n\nVisit our FAQ page for detailed answers.',
        
        // Help
        'help': 'How can I help you? Here are some things you can ask about:\n\n- Services (sea, air, land)\n- Quotes and pricing\n- Delivery times\n- Tracking\n- Customs clearance\n- Company information\n\nType your question or choose from the quick replies.',
        'what can you do': 'I can help you with:\n\n- Service information\n- Quote requests\n- Delivery times\n- Tracking updates\n- Customs clearance\n- Company information\n\nJust ask me anything.',
        
        // Goodbye
        'bye': 'Thank you for chatting with Perfect Page Freight Logistics.\n\nEmail: info@perfectpagefreight.com\nPhone: +233 24 535 9395\n\nHave a great day.',
        'goodbye': 'Goodbye. Feel free to reach out anytime for your freight needs.',
        'thank you': 'You are welcome. If you need anything else, just ask.',
        'thanks': 'You are welcome. Is there anything else I can help with?',
    };
    
    // Quick Replies
    const quickReplies = [
        { text: 'Sea Freight', value: 'sea freight' },
        { text: 'Air Freight', value: 'air freight' },
        { text: 'Land Transport', value: 'land transport' },
        { text: 'Get Quote', value: 'quote' },
        { text: 'Delivery Time', value: 'delivery' },
        { text: 'Contact Us', value: 'contact' },
    ];
    
    // ========================================
    // FUNCTIONS
    // ========================================
    
    function toggleChat() {
        isOpen = !isOpen;
        toggle.classList.toggle('active');
        chatbotWindow.classList.toggle('active');
        if (isOpen) {
            input.focus();
            setTimeout(scrollToBottom, 100);
        }
    }
    
    function closeChat() {
        if (isOpen) toggleChat();
    }
    
    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }
    
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = 'msg ' + sender;
        
        const time = new Date();
        const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let content = text;
        if (sender === 'bot') {
            content = text.replace(/\n/g, '<br>');
        }
        
        div.innerHTML = content + '<span class="time">' + timeStr + '</span>';
        messages.appendChild(div);
        scrollToBottom();
    }
    
    function showTyping() {
        typing.classList.add('active');
        isTyping = true;
        scrollToBottom();
    }
    
    function hideTyping() {
        typing.classList.remove('active');
        isTyping = false;
    }
    
    function getResponse(input) {
        const lower = input.toLowerCase().trim();
        
        // Exact match
        for (const [key, value] of Object.entries(responses)) {
            if (lower === key) return value;
        }
        
        // Partial match
        for (const [key, value] of Object.entries(responses)) {
            if (lower.includes(key) || key.includes(lower)) return value;
        }
        
        // Keyword match
        const keywords = ['hello', 'hi', 'hey', 'service', 'sea', 'air', 'land', 'truck', 'ship', 'price', 'cost', 'quote', 'track', 'delivery', 'time', 'customs', 'contact', 'phone', 'email', 'location', 'about', 'company', 'experience', 'faq', 'help'];
        for (const word of keywords) {
            if (lower.includes(word)) {
                const response = responses[word];
                if (response) return response;
            }
        }
        
        return 'Thank you for your question.\n\nIf you are asking about our services, quotes, delivery times, or customs clearance, please try rephrasing.\n\nOr contact us directly:\nEmail: info@perfectpagefreight.com\nPhone: +233 24 535 9395';
    }
    
    function addQuickReplies() {
        const div = document.createElement('div');
        div.className = 'quick-replies';
        
        quickReplies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'qr-btn';
            btn.textContent = reply.text;
            btn.addEventListener('click', function() {
                addMessage(reply.text, 'user');
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    const response = getResponse(reply.value);
                    addMessage(response, 'bot');
                    
                    // Add quote link button if quote was asked
                    if (reply.value === 'quote') {
                        setTimeout(() => {
                            const linkDiv = document.createElement('div');
                            linkDiv.className = 'quick-replies';
                            const linkBtn = document.createElement('button');
                            linkBtn.className = 'qr-btn';
                            linkBtn.textContent = 'Go to Quote Page';
                            linkBtn.style.background = '#3B82F6';
                            linkBtn.style.color = '#fff';
                            linkBtn.addEventListener('click', function() {
                                window.location.href = 'quote.html';
                            });
                            linkDiv.appendChild(linkBtn);
                            messages.appendChild(linkDiv);
                            scrollToBottom();
                        }, 300);
                    }
                }, 1000);
            });
            div.appendChild(btn);
        });
        
        messages.appendChild(div);
        scrollToBottom();
    }
    
    function sendMessage() {
        const text = input.value.trim();
        if (!text || isTyping) return;
        
        addMessage(text, 'user');
        input.value = '';
        input.focus();
        
        showTyping();
        setTimeout(() => {
            hideTyping();
            const response = getResponse(text);
            addMessage(response, 'bot');
            
            // Show quick replies if user asked about services or help
            const lower = text.toLowerCase();
            if (lower.includes('service') || lower.includes('help') || lower.includes('what') || lower.includes('offer')) {
                setTimeout(addQuickReplies, 300);
            }
        }, 1000 + Math.random() * 500);
    }
    
    // ========================================
    // INITIALIZE
    // ========================================
    
    function initChatbot() {
        addMessage('Hello. Welcome to Perfect Page Freight Logistics.\n\nI am here to help you with:\n- Service information\n- Quotes and pricing\n- Delivery times\n- Customs clearance\n- Tracking updates\n\nWhat can I help you with today?', 'bot');
        addQuickReplies();
    }
    
    // ========================================
    // EVENT LISTENERS
    // ========================================
    
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleChat();
    });
    
    close.addEventListener('click', closeChat);
    
    send.addEventListener('click', sendMessage);
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-open after 3 seconds (only once)
    setTimeout(() => {
        if (!sessionStorage.getItem('chatOpened')) {
            toggleChat();
            sessionStorage.setItem('chatOpened', 'true');
        }
    }, 3000);
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (isOpen) {
            const isInside = chatbotWindow.contains(e.target);
            const isOnToggle = toggle.contains(e.target);
            if (!isInside && !isOnToggle) {
                closeChat();
            }
        }
    });
    
    // Initialize
    initChatbot();
    
});