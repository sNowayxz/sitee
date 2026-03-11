// Navbar functionality
const burgerButton = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

burgerButton.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' && navbar.classList.contains('open')) {
    navbar.classList.remove('open');
  }
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// IntersectionObserver for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const observerOptions = {
  threshold: 0.1
};
const timelineObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

timelineItems.forEach(item => timelineObserver.observe(item));

// Testimonial slider
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
    if (idx === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 8000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

// Initialize slider
showSlide(currentSlide);
startAutoSlide();

// FAQ toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Back-to-top button
const backToTopBtn = document.querySelector('.back-to-top');
function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
    backToTopBtn.classList.add('fixed');
  } else {
    backToTopBtn.classList.remove('show');
  }
}
window.addEventListener('scroll', handleBackToTop);

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
