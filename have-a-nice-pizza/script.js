// Have a nice pizza – drobne interakcje
(function () {
  // Menu mobilne
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Status „otwarte teraz” wg czasu w Warszawie (codziennie 12:00–22:00)
  var status = document.querySelector('[data-open-status]');
  if (status) {
    try {
      var parts = new Intl.DateTimeFormat('pl-PL', {
        timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var h = +parts.find(function (p) { return p.type === 'hour'; }).value;
      var m = +parts.find(function (p) { return p.type === 'minute'; }).value;
      var mins = h * 60 + m;
      var isOpen = mins >= 12 * 60 && mins < 22 * 60;
      status.textContent = isOpen
        ? '● Teraz otwarte do 22:00 – miłego dnia!'
        : '● Teraz zamknięte – zapraszamy od 12:00. Miłego dnia!';
      status.classList.add(isOpen ? 'is-open' : 'is-closed');
    } catch (e) { /* starsza przeglądarka – bez statusu */ }
  }

  // TODO: usunąć po wstawieniu linku do Uber Eats
  document.querySelectorAll('[data-todo-link]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Link do Uber Eats wkrótce. Do tego czasu zamów przez Pyszne.pl lub zadzwoń: 503 166 866. Miłego dnia!');
    });
  });

  // Ukryj przyklejony przycisk, gdy sekcja zamówień jest widoczna
  var sticky = document.querySelector('.sticky-order');
  var order = document.getElementById('zamow');
  if (sticky && order && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { threshold: 0.3 }).observe(order);
  }

  // Rok w stopce
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
