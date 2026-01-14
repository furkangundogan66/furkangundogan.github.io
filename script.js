// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formStatus = document.getElementById('formStatus');
        
        // Validate
        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Lütfen tüm gerekli alanları doldurunuz!';
            formStatus.className = 'form-status error';
            return;
        }
        
        // Prepare email content
        const emailContent = `
Ad: ${name}
E-mail: ${email}
Telefon: ${phone || 'Verilmedi'}
Konu: ${subject}

Mesaj:
${message}
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:info@furkangundogan.com?subject=${encodeURIComponent(`Yeni İstek: ${subject}`)}&body=${encodeURIComponent(emailContent)}`;
        
        // Show success message
        formStatus.textContent = '✓ Mesajınız hazırlandı! E-mail uygulaması açılıyor...';
        formStatus.className = 'form-status success';
        
        // Open mailto after delay
        setTimeout(() => {
            window.location.href = mailtoLink;
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 500);
        }, 1000);
    });
}

// Product button click handler
document.addEventListener('DOMContentLoaded', function() {
    const productBtns = document.querySelectorAll('.product-btn');
    
    productBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            
            // Scroll to contact form
            const contactSection = document.getElementById('iletisim');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill subject
                setTimeout(() => {
                    const subjectSelect = document.getElementById('subject');
                    if (subjectSelect) {
                        // Try to match product with subject
                        if (productName.includes('Automation')) {
                            subjectSelect.value = 'yazilim-otomasyonu';
                        } else if (productName.includes('Hardware') || productName.includes('Bilgisayar')) {
                            subjectSelect.value = 'donanim-satisi';
                        } else if (productName.includes('Bulut') || productName.includes('Cloud')) {
                            subjectSelect.value = 'sistem-kurulumu';
                        }
                        subjectSelect.focus();
                    }
                }, 500);
            }
        });
    });
});
// Pricing Button Handlers
document.addEventListener('DOMContentLoaded', function() {
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            const contactSection = document.getElementById('iletisim');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const parentItem = this.closest('.faq-item');
            
            faqItems.forEach(item => {
                if (item !== parentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            parentItem.classList.toggle('active');
        });
    });
});

// Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-counter');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });

        hasAnimated = true;
    };

    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelector('.about-stats')?.parentElement && 
            observer.observe(document.querySelector('.about-stats'));
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Smooth scroll polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
    window.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            const id = target.getAttribute('href');
            const el = document.querySelector(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Add floating animation to hero
window.addEventListener('load', function() {
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.style.animation = 'float 3s ease-in-out infinite';
    }
});

// Prevent multiple form submissions
let isSubmitting = false;
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            isSubmitting = true;
            setTimeout(() => { isSubmitting = false; }, 2000);
        });
    }
// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .product-card, .stat');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// Smooth scroll polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
    window.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            const id = target.getAttribute('href');
            const el = document.querySelector(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Add floating animation to hero
window.addEventListener('load', function() {
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.style.animation = 'float 3s ease-in-out infinite';
    }
});
