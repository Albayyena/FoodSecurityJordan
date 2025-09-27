document.addEventListener('DOMContentLoaded', () => {
  // الوضع الليلي/النهاري
  let toggleBtn = document.getElementById('modeToggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'modeToggle';
    toggleBtn.textContent = '🌙 الوضع الليلي';
    document.body.appendChild(toggleBtn);
  }

  const body = document.body;
  const savedMode = localStorage.getItem('mode') || 'light';
  body.classList.add(savedMode + '-mode');
  toggleBtn.textContent = savedMode === 'dark' ? '☀️ الوضع النهاري' : '🌙 الوضع الليلي';

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const newMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', newMode);
    toggleBtn.textContent = newMode === 'dark' ? '☀️ الوضع النهاري' : '🌙 الوضع الليلي';
    drawSkySymbol();
  });

  // تعيين نوع الصفحة لتفعيل التدرج اللوني
  const pageName = location.pathname.split('/').pop().replace('.html', '');
  body.setAttribute('data-page', pageName);

  // رسم السماء التفاعلية
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawSkySymbol() {
      resizeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mode = body.classList.contains('dark-mode') ? 'night' : 'day';
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (mode === 'day') {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#ffeb3b';
        ctx.fill();
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 / 8) * i;
          const x = centerX + Math.cos(angle) * 45;
          const y = centerY + Math.sin(angle) * 45;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#fff176';
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#b0bec5';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 10, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#263238';
        ctx.fill();
        for (let i = 0; i < 25; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }
    }

    window.addEventListener('resize', drawSkySymbol);
    drawSkySymbol();
  }

  // شريط التمرير
  let scrollBar = document.getElementById('scrollProgress');
  if (!scrollBar) {
    scrollBar = document.createElement('div');
    scrollBar.id = 'scrollProgress';
    document.body.appendChild(scrollBar);
  }

  function updateScrollBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollBar);
  window.addEventListener('resize', updateScrollBar);
  updateScrollBar();

  // زر "ابدأ الرحلة"
  const btn = document.getElementById('startJourney');
  const stages = document.querySelectorAll('.stage');
  let index = 0;
  let started = false;

  function revealNext() {
    if (index < stages.length) {
      stages[index].classList.add('visible');
      index++;
      setTimeout(revealNext, 800);
    }
  }

  if (btn) {
    btn.addEventListener('click', () => {
      if (!started) {
        started = true;
        revealNext();
      }
    });
  }

  // مراقبة ظهور البطاقات
  const cards = document.querySelectorAll('.card, .stage');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  cards.forEach(card => observer.observe(card));

  // تفعيل النسب المئوية
  const percentElements = document.querySelectorAll('[data-percent]');
  percentElements.forEach(el => {
    const val = parseInt(el.getAttribute('data-percent'));
    if (!isNaN(val)) {
      el.textContent = val + '%';
      el.style.width = val + '%';
      el.classList.add('filled');
    }
  });

  // نموذج التفاعل في صفحة "رحلة البذرة"
  const form = document.getElementById('thoughtForm');
  const message = document.getElementById('thankYouMessage');

  if (form && message) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.style.display = 'none';
      message.style.display = 'block';
    });
  }
});


