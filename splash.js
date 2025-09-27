document.addEventListener('DOMContentLoaded', () => {
  // إنشاء شاشة البداية ديناميكيًا
  const splash = document.createElement('div');
  splash.id = 'splashScreen';

  const logoBox = document.createElement('div');
  logoBox.className = 'logo-animation logo-box';

  const seed = document.createElement('div');
  seed.className = 'seed-icon';

  const title = document.createElement('h1');
  title.className = 'splash-title';
  title.textContent = '🌱 رحلة البذرة';

  const text = document.createElement('p');
  text.className = 'splash-text';
  text.innerHTML = 'تبدأ الرحلة من قطرة ماء…<br>وتنمو لتصبح وعدًا بالاكتفاء.';

  logoBox.appendChild(seed);
  logoBox.appendChild(title);
  logoBox.appendChild(text);
  splash.appendChild(logoBox);
  document.body.appendChild(splash);

  // إخفاء الشاشة بعد 4 ثوانٍ بتأثير ناعم
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.remove();
    }, 1000);
  }, 4000);
});
