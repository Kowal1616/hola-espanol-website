// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Reveal animations on scroll
    initScrollAnimations();

    // Phone reveal handler
    const revealBtn = document.getElementById('reveal-phone-btn');
    if (revealBtn) {
        revealBtn.addEventListener('click', revealPhone);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Anti-bot phone reveal: number stored reversed
function revealPhone() {
    const reversed = '427 086 805 84+';
    const phone = reversed.split('').reverse().join('');
    const container = document.getElementById('phone-container');
    const isMobile = window.matchMedia("(max-width: 991px)").matches;

    if (isMobile) {
        // Mobile: clickable tel: link
        container.innerHTML =
            '<a href="tel:' + phone.replace(/\s/g, '') + '" class="phone-link d-block mb-3">' +
            '<i data-lucide="phone" class="me-2"></i>' +
            '<span class="reversed-text">' + reversed + '</span>' +
            '</a>';
    } else {
        // Desktop: plain static text, no link, no tel: action
        container.innerHTML =
            '<p class="phone-link d-block mb-3 phone-link-static">' +
            '<i data-lucide="phone" class="me-2"></i>' +
            '<span class="reversed-text">' + reversed + '</span>' +
            '</p>';
    }
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Contact Form Submission (Netlify)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = this;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.disabled = true;

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
            .then(() => {
                alert('Dziękujemy za wiadomość! Odezwiemy się wkrótce.');
                form.reset();
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                alert('Wystąpił błąd przy wysyłaniu formularza. Spróbuj ponownie.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Reveal animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}
