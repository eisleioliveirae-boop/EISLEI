// Navigation behavior: when click a nav link -> scroll to section and set link active (gold color)
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function setActiveLink(targetId) {
    navLinks.forEach(a => {
      if (a.dataset.target === targetId) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  // Smooth scroll + active link
  navLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const id = a.getAttribute('href').replace('#','');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveLink(id);
      }
    });
  });

  // Change active on scroll (optional): highlight link of section in viewport
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = section.id;
      }
    });
    if (current) setActiveLink(current);
  });

  /* ---------- EmailJS form handling ---------- */
  // Initialize EmailJS with your public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init('rbNmUP_uVXlHnf3Ko'); // Public Key passado por você
  }

  const contactForm = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    statusBox.textContent = 'Enviando...';

    // IDs fornecidos por você
    const SERVICE_ID = 'service_ju5k04n';
    const TEMPLATE_ID = 'template_9qmusmm';

    // Envia o formulário (envia todos os campos)
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
      .then(function () {
        statusBox.textContent = 'Mensagem enviada com sucesso. Entraremos em contato.';
        contactForm.reset();
      }, function (error) {
        console.error('Erro EmailJS:', error);
        statusBox.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
      });
  });

});
