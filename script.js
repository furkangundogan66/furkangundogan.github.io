// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved theme preference - Default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
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
            formStatus.textContent = '✗ Lütfen tüm gerekli alanları doldurunuz!';
            formStatus.className = 'form-status error';
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = '✗ Geçerli bir e-mail adresi girin!';
            formStatus.className = 'form-status error';
            return;
        }
        
        // Show processing
        formStatus.textContent = '⏳ Mesajınız gönderiliyor...';
        formStatus.className = 'form-status processing';
        
        // Prepare data
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // Send to formspree or similar service
        fetch('https://formspree.io/f/xyzpqrst', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                formStatus.textContent = '✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                formStatus.className = 'form-status success';
                contactForm.reset();
                
                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            } else {
                throw new Error('Network error');
            }
        })
        .catch(error => {
            // Fallback to mailto if formspree fails
            const emailContent = `Ad: ${name}%0AE-mail: ${email}%0ATelefon: ${phone || 'Verilmedi'}%0AKonu: ${subject}%0A%0AMesaj:%0A${message}`;
            const mailtoLink = `mailto:info@furkangundogan.com?subject=Yeni İstek: ${subject}&body=${emailContent}`;
            
            formStatus.textContent = '✓ Mesajınız e-mail uygulamasıyla gönderilecek...';
            formStatus.className = 'form-status success';
            
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);
        });
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

// Floating Particles Animation
function createFloatingParticles() {
    const particleIcons = ['⚡', '🔮', '✨', '🎯', '💫', '🌀', '🔥', '⚙'];
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-icon-${(i % 5) + 1}`;
        particle.innerHTML = particleIcons[i];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.color = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)];
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        heroSection.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            particle.remove();
        }, 6000 + (i * 500));
    }
}

// Create particles every 3 seconds
setInterval(createFloatingParticles, 3000);
createFloatingParticles();

// Neon Text Pulse Effect
const neonElements = document.querySelectorAll('.neon-element');
neonElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.animation = 'colorShift 1s ease-in-out';
    });
});

// Enhanced Button Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.6)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});// Observe cards
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
