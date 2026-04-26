  document.addEventListener("DOMContentLoaded", () => {

  // AOS
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });

  const header = document.getElementById('header');
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTop = document.getElementById('scrollTop');
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const messageSuccess = document.getElementById('messageSuccess');
  const messageError = document.getElementById('messageError');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  /* ===== MOBILE MENU ===== */
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  /* ===== THEME TOGGLE ===== */
  const getCurrentTheme = () => localStorage.getItem('theme') || 'light';

  const setTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  };

  setTheme(getCurrentTheme());

  themeToggle.addEventListener('click', () => {
    setTheme(getCurrentTheme() === 'light' ? 'dark' : 'light');
  });

  /* ===== SCROLL ===== */
  window.addEventListener('scroll', () => {
    header.classList.toggle('header-scrolled', window.scrollY > 100);
    scrollTop.classList.toggle('active', window.scrollY > 500);
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== PROJECT FILTER ===== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        card.style.display =
          filter === 'all' || card.dataset.category === filter
            ? 'block'
            : 'none';
      });
    });
  });

  /* ===== CONTACT FORM ===== */
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    submitBtn.innerHTML = '<div class="loader"></div>';
    submitBtn.disabled = true;
    messageSuccess.style.display = 'none';
    messageError.style.display = 'none';

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Send Message</span>';
      submitBtn.disabled = false;
      messageSuccess.style.display = 'block';
      contactForm.reset();

      setTimeout(() => {
        messageSuccess.style.display = 'none';
      }, 5000);
    }, 1500);
  });

});
