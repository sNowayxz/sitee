/* ═══════════════════════════════════════════
   Portal da Assessoria Acadêmica — script.js
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ════════════════════════════════════
  // TAB NAVIGATION
  // ════════════════════════════════════
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabSections = document.querySelectorAll('.tab-section');

  function showTab(tabId) {
    // Hide all tabs
    tabSections.forEach(function (section) {
      section.classList.remove('active');
    });

    // Remove active from all nav buttons
    navButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    // Show selected tab
    var target = document.getElementById(tabId);
    if (target) {
      target.classList.add('active');
    }

    // Activate corresponding nav button
    navButtons.forEach(function (btn) {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      }
    });

    // Trigger animations for the section
    triggerSectionAnimations(tabId);

    // Generate QR codes if on orcamento tab
    if (tabId === 'orcamento') {
      generateQRCodes();
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Bind click events to nav buttons
  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = this.getAttribute('data-tab');
      showTab(tabId);
    });
  });

  // Bind CTA buttons to go to orcamento
  var btnOrcamento = document.getElementById('btn-orcamento');
  if (btnOrcamento) {
    btnOrcamento.addEventListener('click', function () {
      showTab('orcamento');
    });
  }

  var btnOrcamento2 = document.getElementById('btn-orcamento-2');
  if (btnOrcamento2) {
    btnOrcamento2.addEventListener('click', function () {
      showTab('orcamento');
    });
  }


  // ════════════════════════════════════
  // SCROLL-TRIGGERED ANIMATIONS
  // ════════════════════════════════════
  function triggerSectionAnimations(tabId) {
    if (tabId === 'apresentacao') {
      animateCards();
    }
    if (tabId === 'como-funciona') {
      animateTimeline();
    }
  }

  // Cards animation
  function animateCards() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
      card.classList.remove('visible');
      // Force reflow
      void card.offsetWidth;
      card.classList.add('visible');
    });
  }

  // Timeline animation
  function animateTimeline() {
    var timeline = document.querySelector('.timeline');
    var steps = document.querySelectorAll('.timeline-step');

    if (timeline) {
      timeline.classList.remove('animated');
      void timeline.offsetWidth;
      timeline.classList.add('animated');
    }

    steps.forEach(function (step) {
      step.classList.remove('visible');
      void step.offsetWidth;
      step.classList.add('visible');
    });
  }

  // Initial animation for the first tab
  setTimeout(function () {
    animateCards();
  }, 300);


  // ════════════════════════════════════
  // NAVBAR SCROLL EFFECT
  // ════════════════════════════════════
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ════════════════════════════════════
  // BANNER PARTICLES
  // ════════════════════════════════════
  var particlesContainer = document.getElementById('particles');

  function createParticle() {
    var particle = document.createElement('div');
    particle.className = 'particle';

    var size = Math.random() * 4 + 2;
    var left = Math.random() * 100;
    var delay = Math.random() * 4;
    var duration = Math.random() * 3 + 5;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = left + '%';
    particle.style.bottom = '-10px';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';

    particlesContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(function () {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, (delay + duration) * 1000);
  }

  // Create initial particles
  for (var i = 0; i < 12; i++) {
    createParticle();
  }

  // Continuously spawn particles
  setInterval(function () {
    createParticle();
  }, 2000);


  // ════════════════════════════════════
  // QR CODE GENERATION
  // ════════════════════════════════════
  var qrGenerated = false;

  function generateQRCodes() {
    if (qrGenerated) return;

    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
      // Fallback: draw placeholder QR
      drawFallbackQR('qr1');
      drawFallbackQR('qr2');
      return;
    }

    try {
      // Clear canvas containers first
      var qr1Container = document.getElementById('qr1').parentElement;
      var qr2Container = document.getElementById('qr2').parentElement;

      // Remove existing canvas
      qr1Container.innerHTML = '<div id="qr1-code"></div>';
      qr2Container.innerHTML = '<div id="qr2-code"></div>';

      // Generate real QR codes
      new QRCode(document.getElementById('qr1-code'), {
        text: 'https://wa.me/5543999066267',
        width: 136,
        height: 136,
        colorDark: '#0a1628',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });

      new QRCode(document.getElementById('qr2-code'), {
        text: 'https://wa.me/5518981591286',
        width: 136,
        height: 136,
        colorDark: '#0a1628',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });

      qrGenerated = true;
    } catch (e) {
      console.warn('QR Code generation failed, using fallback:', e);
      drawFallbackQR('qr1');
      drawFallbackQR('qr2');
    }
  }

  // Fallback QR drawing if library fails to load
  function drawFallbackQR(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var size = 140;
    canvas.width = size;
    canvas.height = size;

    var modules = 25;
    var cellSize = size / modules;
    var seed = canvasId === 'qr1' ? 12345 : 67890;

    function seededRandom() {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#0a1628';

    for (var r = 0; r < modules; r++) {
      for (var c = 0; c < modules; c++) {
        var inFinder = (r < 7 && c < 7) || (r < 7 && c >= modules - 7) || (r >= modules - 7 && c < 7);

        if (inFinder) {
          var lr = r < 7 ? r : r - (modules - 7);
          var lc = c < 7 ? c : c - (modules - 7);
          var isEdge = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          var isInner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          if (isEdge || isInner) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        } else if (!(r === 7 || c === 7 || r === modules - 8 || c === modules - 8)) {
          if (seededRandom() > 0.46) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }
    }

    // Center icon
    ctx.fillStyle = '#ffffff';
    var ctrSize = cellSize * 5;
    var ctrPos = (size - ctrSize) / 2;
    ctx.fillRect(ctrPos, ctrPos, ctrSize, ctrSize);
    ctx.fillStyle = '#25d366';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, cellSize * 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold ' + (cellSize * 2) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✆', size / 2, size / 2 + 1);
  }


  // ════════════════════════════════════
  // INTERSECTION OBSERVER (Scroll animations)
  // ════════════════════════════════════
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe cards and timeline steps
    document.querySelectorAll('.card, .timeline-step').forEach(function (el) {
      observer.observe(el);
    });
  }


  // ════════════════════════════════════
  // SMOOTH HOVER EFFECT ON CARDS
  // ════════════════════════════════════
  document.querySelectorAll('.card, .contact-card, .step-content').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

});
