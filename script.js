(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const YEAR_EL = document.getElementById('year');

  const getSystemTheme = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const getStoredTheme = () => {
    try { return localStorage.getItem('theme') || null; } catch { return null; }
  };
  const storeTheme = (t) => {
    try { localStorage.setItem('theme', t); } catch {}
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      const dark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.querySelector('.icon').textContent = dark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.title = dark ? 'Switch to light' : 'Switch to dark';
    }
  };

  const initTheme = () => {
    const stored = getStoredTheme();
    const theme = stored || 'dark';
    applyTheme(theme);
  };

  // Initialize theme on page load
  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentAttr = root.getAttribute('data-theme');
      // Handle 'auto' or missing attribute by defaulting to dark
      const current = (currentAttr && currentAttr !== 'auto') ? currentAttr : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  // Intersection Observer for reveals
  const revealSections = document.querySelectorAll('.section-reveal');
  if ('IntersectionObserver' in window && revealSections.length) {
    const io = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revealSections.forEach((el) => io.observe(el));
  } else {
    revealSections.forEach((el) => el.classList.add('revealed'));
  }

  // Dynamic year
  if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();
})();




