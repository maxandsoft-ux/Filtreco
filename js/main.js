/* ============================================================
   Filtreco.RU — интерактив
   ============================================================ */
(function () {
  'use strict';

  /* ----- Мобильное меню ----- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Закрывать меню при клике по ссылке
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Маска телефона в форме ----- */
  const phoneInput = document.querySelector('#leadForm input[name="phone"]');

  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let digits = this.value.replace(/\D/g, '');
      if (digits.startsWith('8')) digits = '7' + digits.slice(1);
      if (!digits.startsWith('7')) digits = '7' + digits;
      digits = digits.slice(0, 11);

      let out = '+7';
      if (digits.length > 1) out += ' (' + digits.slice(1, 4);
      if (digits.length >= 5) out += ') ' + digits.slice(4, 7);
      if (digits.length >= 8) out += '-' + digits.slice(7, 9);
      if (digits.length >= 10) out += '-' + digits.slice(9, 11);
      this.value = out;
    });
  }

  /* ----- Отправка формы (демо: без бэкенда) ----- */
  const form = document.getElementById('leadForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        const empty = !input.value.trim();
        const badPhone = input.name === 'phone' && input.value.replace(/\D/g, '').length < 11;
        if (empty || badPhone) {
          input.classList.add('is-error');
          valid = false;
        } else {
          input.classList.remove('is-error');
        }
      });

      if (!valid) return;

      // Здесь подключите отправку на сервер: fetch('/api/lead', {...})
      success.hidden = false;
      form.querySelectorAll('input, select, button').forEach(function (el) {
        el.disabled = true;
      });
    });
  }

  /* ----- Плавное появление блоков при скролле ----- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .product-card, .step, .feature, .accordion__item, .card'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
