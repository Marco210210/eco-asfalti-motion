(function () {
  var storageKey = 'ecoasfalti-theme';
  var savedTheme;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (_) {
    savedTheme = null;
  }

  var theme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4faf7' : '#0c0c0e');
}());
