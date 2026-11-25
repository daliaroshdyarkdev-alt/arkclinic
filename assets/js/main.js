/* ArkClinic — tiny helper script
   1) English / Arabic switch (remembers your choice)
   2) Mobile menu
   3) Header shadow on scroll
   To translate any element, add data-ar="Arabic text" to it.
   For input placeholders use data-ar-ph="Arabic placeholder". */
(function () {
  var root = document.documentElement;
  var KEY = 'arkclinic-lang';

  function applyLang(lang) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = lang === 'ar' ? el.dataset.ar : el.dataset.en;
    });
    document.querySelectorAll('[data-ar-ph]').forEach(function (el) {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', lang === 'ar' ? el.dataset.arPh : el.dataset.enPh);
    });
    document.querySelectorAll('[data-ar-tip]').forEach(function (el) {
      if (el.dataset.enTip === undefined) el.dataset.enTip = el.dataset.tip || '';
      el.dataset.tip = lang === 'ar' ? el.dataset.arTip : el.dataset.enTip;
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.textContent = lang === 'ar' ? 'English' : 'عربي';
      btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = 'en';
  try { saved = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  applyLang(saved);

  document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(root.lang === 'ar' ? 'en' : 'ar');
    });
  });

  // Mobile menu
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  if (header && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('nav-open'); });
    });
  }

  // Header border on scroll
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
