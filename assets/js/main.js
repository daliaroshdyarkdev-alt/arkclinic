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

  // Demo form: send to Formspree in the background, then show the thank-you page
  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    var btn = form.querySelector('button[type="submit"]');
    var msg = form.querySelector('.form-msg');
    var say = function (en, ar) { if (msg) msg.textContent = root.lang === 'ar' ? ar : en; };
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return; // very old browsers: normal form post
      e.preventDefault();
      btn.disabled = true;
      say('Sending…', 'جارٍ الإرسال…');
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('send failed');
          window.location.href = 'thanks.html';
        })
        .catch(function () {
          btn.disabled = false;
          say("Couldn't send your request. Try again, or email us at egypt@arkdev.net.",
              'لم نتمكن من إرسال طلبك. حاول مرة أخرى أو راسلنا على egypt@arkdev.net.');
        });
    });
  });

  // Reviews carousel: moves one whole card at a time and keeps looping.
  // Dots underneath show the current review. On phones (≤720px) cards rotate upward.
  document.querySelectorAll('[data-carousel]').forEach(function (box) {
    var track = box.querySelector('.rv-track');
    var dotsBox = box.querySelector('.rv-dots');
    var cards = Array.prototype.slice.call(track.children);
    var total = cards.length;
    if (total < 2) return;

    // Copies of the first cards at the end make the loop seamless
    cards.slice(0, 3).forEach(function (c) {
      var copy = c.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
    });

    var vertical = window.matchMedia('(max-width: 720px)');
    var index = 0, timer = null, DELAY = 3500;

    var dots = cards.map(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Review ' + (i + 1));
      b.addEventListener('click', function () { go(i); start(); });
      dotsBox.appendChild(b);
      return b;
    });

    function stepSize() {
      var a = track.children[0].getBoundingClientRect();
      var b = track.children[1].getBoundingClientRect();
      return vertical.matches ? b.top - a.top : b.left - a.left; // negative in Arabic, so it moves the other way
    }
    function place(animate) {
      track.classList.toggle('no-anim', !animate);
      var d = -index * stepSize();
      track.style.transform = vertical.matches ? 'translateY(' + d + 'px)' : 'translateX(' + d + 'px)';
      dots.forEach(function (b, i) {
        var on = i === index % total;
        b.classList.toggle('on', on);
        b.setAttribute('aria-current', on ? 'true' : 'false');
      });
    }
    function go(i) { index = i; place(true); }
    function next() { go(index + 1); }

    // After sliding onto the copy of the first card, jump back to the real one invisibly
    track.addEventListener('transitionend', function () {
      if (index >= total) { index -= total; place(false); void track.offsetWidth; }
    });

    function stop() { if (timer) clearInterval(timer); timer = null; }
    function start() { stop(); timer = setInterval(next, DELAY); }

    // Pause while a mouse is over the reviews (not on touch screens)
    box.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') stop(); });
    box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') start(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    window.addEventListener('resize', function () { if (index >= total) index -= total; place(false); });

    place(false);
    start();
  });

  // Header border on scroll
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
