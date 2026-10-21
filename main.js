/* 27th Trucks Inc. — redesign concept interactions (no dependencies) */
(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Truck data (sourced from 27th-trucks.com listings) ---------- */
  const IMG = 'assets/img/';
  const TRUCKS = {
    'int-mv607': {
      kicker: '2023 · Vacuum / Septic truck',
      title: '2023 International MV607',
      price: '$109,900',
      source: 'https://www.27th-trucks.com/property/2023-international-mv-607---2-500g-aluminum-tank',
      photos: ['int-2023-1.jpg', 'int-2023-2.jpg', 'int-2023-3.jpg', 'int-2023-4.jpg', 'int-2023-5.jpg', 'int-2023-6.jpg', 'int-2023-8.jpg'],
      specs: [
        ['Engine', 'Cummins ISB 6.7L diesel'],
        ['Transmission', 'Allison automatic'],
        ['Tank', 'Brand-new 2,500-gallon aluminum'],
        ['Vacuum pump', 'Battioni Spartan · 393 CFM'],
        ['Mileage', '63,000 original miles'],
        ['Tires', 'New 11R22.5'],
        ['Toolbox', '36″ aluminum'],
        ['Intake', '3″ brass lever valve'],
        ['Discharge', '4″ brass lever valve'],
        ['Sight glass', '3″ rear'],
      ],
    },
    'pete-337': {
      kicker: '2017 · Under CDL vacuum truck',
      title: '2017 Peterbilt 337',
      price: '$85,000',
      source: 'https://www.27th-trucks.com/property/2017-peterbilt-337---2-000g',
      photos: ['pete-337-1.jpg', 'pete-337-2.jpg', 'pete-337-3.jpg'],
      specs: [
        ['Engine', 'Paccar 6.7L'],
        ['Transmission', 'Allison automatic'],
        ['Tank', '2,000 gallon'],
        ['Vacuum pump', 'Masport Viper · 360 CFM'],
        ['Mileage', '93,000 original miles'],
        ['Tires', '11R22.5 · new wheels & tires'],
        ['Toolbox', '36″'],
        ['Intake', '3″ valve'],
        ['Discharge', '4″ valve'],
      ],
    },
    'pete-330': {
      kicker: '2016 · Vacuum / Septic truck',
      title: '2016 Peterbilt 330',
      price: '$79,900',
      source: 'https://www.27th-trucks.com/property/2016-peterbilt-330---2500g-septictruck',
      photos: ['pete-330-1.jpg'],
      specs: [
        ['Engine', 'Paccar PX9'],
        ['Transmission', 'Allison automatic'],
        ['Tank', '2,500-gallon septic tank'],
        ['Vacuum pump', 'Masport Viper · 350 CFM'],
        ['Mileage', '175,000 miles'],
        ['Toolbox', '36″ aluminum diamond plate'],
        ['Intake', '3″ brass lever valve'],
        ['Discharge', '4″ brass lever valve'],
        ['Sight glass', '3″ rear'],
      ],
    },
  };

  /* ---------- Header: scrolled state + mobile menu ---------- */
  const header = $('.site-header');
  const toggle = $('.nav__toggle');
  const mobileBar = $('.mobile-bar');
  const hero = $('.hero');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (mobileBar) mobileBar.classList.toggle('is-visible', y > hero.offsetHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  $$('.nav__links a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Active nav link ---------- */
  const navLinks = $$('.nav__links a[href^="#"]');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  // Stagger siblings that share a grid
  $$('.truck-grid, .pillars, .fw-grid').forEach((grid) => {
    $$('.reveal', grid).forEach((el, i) => el.style.setProperty('--d', `${i * 0.1}s`));
  });
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Stat counters ---------- */
  const counters = $$('[data-count]');
  const fmt = new Intl.NumberFormat('en-US');
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion.matches) { el.textContent = fmt.format(target) + suffix; return; }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt.format(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { runCounter(entry.target); countIO.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => countIO.observe(el));

  /* ---------- Inventory filter ---------- */
  const chips = $$('.chip[data-filter]');
  const cards = $$('.truck-card');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', String(on));
    });
    cards.forEach((card) => {
      const show = f === 'all' || card.dataset.tank === f;
      card.classList.toggle('is-hidden', !show);
      if (show) card.classList.add('is-in');
    });
  }));

  /* ---------- Tabs (Inside every build) ---------- */
  const tabs = $$('[role="tab"]');
  const selectTab = (tab, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------- Truck detail modal + gallery ---------- */
  const modal = $('#truck-modal');
  const mImg = $('#tm-image');
  const mThumbs = $('#tm-thumbs');
  const mCount = $('#tm-count');
  const mPrev = $('.gallery__nav--prev', modal);
  const mNext = $('.gallery__nav--next', modal);
  let current = null;
  let idx = 0;
  let lastTrigger = null;

  const showPhoto = (i) => {
    const photos = TRUCKS[current].photos;
    idx = (i + photos.length) % photos.length;
    const swap = () => {
      mImg.src = IMG + photos[idx];
      mImg.alt = `${TRUCKS[current].title} — photo ${idx + 1} of ${photos.length}`;
      mImg.classList.remove('is-swapping');
    };
    if (reduceMotion.matches || !mImg.getAttribute('src')) swap();
    else { mImg.classList.add('is-swapping'); setTimeout(swap, 150); }
    mCount.textContent = `${idx + 1} / ${photos.length}`;
    $$('button', mThumbs).forEach((b, n) => b.setAttribute('aria-current', String(n === idx)));
  };

  const openTruck = (id, trigger) => {
    const t = TRUCKS[id];
    if (!t) return;
    current = id;
    lastTrigger = trigger || null;
    $('#tm-kicker').textContent = t.kicker;
    $('#tm-title').textContent = t.title;
    $('#tm-price').textContent = t.price;
    $('#tm-source').href = t.source;
    $('#tm-specs').innerHTML = t.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    mThumbs.innerHTML = t.photos.map((p, n) =>
      `<button type="button" aria-label="Show photo ${n + 1}"><img src="${IMG + p}" alt="" loading="lazy"></button>`).join('');
    $$('button', mThumbs).forEach((b, n) => b.addEventListener('click', () => showPhoto(n)));
    const multi = t.photos.length > 1;
    mPrev.hidden = mNext.hidden = !multi;
    mThumbs.hidden = !multi;
    mCount.hidden = !multi;
    mImg.removeAttribute('src');
    showPhoto(0);
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
    $('.truck-modal__inner', modal).scrollTop = 0;
    $('.truck-modal__info', modal).scrollTop = 0;
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    if (modal.open) modal.close();
  };
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  $('[data-close]', modal).addEventListener('click', closeModal);
  [mPrev, mNext].forEach((b) => b.addEventListener('click', () => showPhoto(idx + Number(b.dataset.step))));
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showPhoto(idx + 1);
    if (e.key === 'ArrowLeft') showPhoto(idx - 1);
  });

  // Swipe on the gallery stage
  let touchX = null;
  const stage = $('.gallery__stage', modal);
  stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (touchX === null || TRUCKS[current].photos.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) showPhoto(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  $$('[data-open-truck]').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    openTruck(el.dataset.openTruck, el);
  }));

  /* ---------- Inquiry routing: buttons prefill the demo form ---------- */
  const form = $('#inquiry-form');
  const fTruck = $('#f-truck');
  const fInterest = $('#f-interest');
  const fMsg = $('#f-msg');
  const fName = $('#f-name');

  const flash = (el) => {
    const field = el.closest('.field');
    field.classList.remove('is-flash');
    void field.offsetWidth; // restart animation
    field.classList.add('is-flash');
  };

  const goToContact = ({ truck, interest } = {}) => {
    showForm();
    if (truck) {
      fTruck.value = truck;
      if (!fMsg.value.trim()) fMsg.value = `Hi, I'm interested in the ${TRUCKS[truck].title} (${TRUCKS[truck].price}). Is it still available?`;
      flash(fTruck);
    }
    if (interest) {
      fInterest.value = interest;
      flash(fInterest);
    }
    $('#contact').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    setTimeout(() => fName.focus({ preventScroll: true }), reduceMotion.matches ? 0 : 700);
  };

  $$('[data-inquire]').forEach((b) => b.addEventListener('click', () => goToContact({ truck: b.dataset.inquire, interest: 'Purchase' })));
  $('#tm-inquire').addEventListener('click', () => {
    const id = current;
    closeModal();
    goToContact({ truck: id, interest: 'Purchase' });
  });
  $$('[data-interest]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    setMenu(false);
    goToContact({ interest: a.dataset.interest });
  }));

  /* ---------- Demo form ---------- */
  const success = $('#form-success');
  const showForm = () => { success.hidden = true; form.hidden = false; };

  const validate = () => {
    let ok = true;
    $$('.field__error', form).forEach((n) => n.remove());
    [[fName, 'Please enter your name.'], [$('#f-phone'), 'Please enter a phone number.']].forEach(([input, msg]) => {
      const field = input.closest('.field');
      const bad = !input.value.trim();
      field.classList.toggle('is-invalid', bad);
      input.setAttribute('aria-invalid', String(bad));
      if (bad) {
        ok = false;
        const err = document.createElement('span');
        err.className = 'field__error';
        err.id = input.id + '-err';
        err.textContent = msg;
        input.setAttribute('aria-describedby', err.id);
        field.append(err);
      } else {
        input.removeAttribute('aria-describedby');
      }
    });
    return ok;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Demo only: nothing is sent anywhere.
    if (!validate()) { $('.is-invalid input', form).focus(); return; }
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });
  $$('input', form).forEach((i) => i.addEventListener('input', () => {
    const field = i.closest('.field');
    if (field.classList.contains('is-invalid') && i.value.trim()) {
      field.classList.remove('is-invalid');
      i.setAttribute('aria-invalid', 'false');
      const err = $('.field__error', field);
      if (err) err.remove();
    }
  }));
  $('#form-reset').addEventListener('click', () => {
    form.reset();
    showForm();
    fName.focus();
  });
})();
