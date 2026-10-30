/* =========================================================
   DSFabio Digital · script comune a tutte le pagine
   - menu mobile, barra di avanzamento, comparse, luce del mouse
   - pulsanti "Prova gratis" [data-open]: aprono WhatsApp con messaggio pronto
     Un pulsante può indicare il modello scelto: data-model="MDC-001 · Gusto 360°"
   ========================================================= */
(function () {
'use strict';
var WA = '393440301412';
var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function (s, c) { return (c || document).querySelector(s); };
var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
document.body.classList.remove('no-js');

/* ---------- Testi degli script nelle 6 lingue del sito (<html lang>) ---------- */
var I18N = {
  it: {open: 'Apri il menu', close: 'Chiudi il menu', trial: 'Ciao Fabio! Vorrei attivare la prova gratuita di 30 giorni del menu digitale{m}.', model: ' con il modello {n}', bar: 'Prova gratuita', barBtn: '🚀 Prova gratis 30 giorni', waAria: 'Scrivici su WhatsApp', info: 'Ciao! Vorrei informazioni sul menu digitale con QR code e la prova gratuita di 30 giorni.', infoShort: 'Ciao! Vorrei informazioni sul menu digitale con QR code.',
    ck: 'Questo sito usa solo cookie tecnici, necessari a farlo funzionare: niente profilazione, statistiche o pubblicità.', ckMore: 'Informativa', ckOk: 'Ok, ho capito', ckAria: 'Avviso sui cookie'},
  en: {open: 'Open menu', close: 'Close menu', trial: 'Hi Fabio! I would like to start the free 30-day trial of the digital menu{m}.', model: ' with the template {n}', bar: 'Free trial', barBtn: '🚀 Try it free for 30 days', waAria: 'Message us on WhatsApp', info: 'Hi! I would like some information about the QR code digital menu and the free 30-day trial.', infoShort: 'Hi! I would like some information about the QR code digital menu.',
    ck: 'This site only uses technical cookies needed to make it work: no profiling, analytics or advertising.', ckMore: 'Learn more', ckOk: 'Ok, got it', ckAria: 'Cookie notice'},
  es: {open: 'Abrir el menú', close: 'Cerrar el menú', trial: '¡Hola Fabio! Me gustaría activar la prueba gratuita de 30 días del menú digital{m}.', model: ' con el modelo {n}', bar: 'Prueba gratuita', barBtn: '🚀 Prueba gratis 30 días', waAria: 'Escríbenos por WhatsApp', info: '¡Hola! Me gustaría información sobre el menú digital con código QR y la prueba gratuita de 30 días.', infoShort: '¡Hola! Me gustaría información sobre el menú digital con código QR.',
    ck: 'Este sitio solo usa cookies técnicas, necesarias para su funcionamiento: sin perfiles, estadísticas ni publicidad.', ckMore: 'Más información', ckOk: 'Vale, entendido', ckAria: 'Aviso de cookies'},
  pt: {open: 'Abrir o menu', close: 'Fechar o menu', trial: 'Olá Fabio! Gostaria de ativar o teste gratuito de 30 dias do cardápio digital{m}.', model: ' com o modelo {n}', bar: 'Teste gratuito', barBtn: '🚀 Teste grátis por 30 dias', waAria: 'Fale conosco no WhatsApp', info: 'Olá! Gostaria de informações sobre o cardápio digital com QR code e o teste gratuito de 30 dias.', infoShort: 'Olá! Gostaria de informações sobre o cardápio digital com QR code.',
    ck: 'Este site usa apenas cookies técnicos, necessários para o seu funcionamento: sem criação de perfis, estatísticas ou publicidade.', ckMore: 'Saiba mais', ckOk: 'Ok, entendi', ckAria: 'Aviso sobre cookies'},
  de: {open: 'Menü öffnen', close: 'Menü schließen', trial: 'Hallo Fabio! Ich möchte die kostenlose 30-Tage-Testphase der digitalen Speisekarte{m} starten.', model: ' mit der Vorlage {n}', bar: 'Kostenloser Test', barBtn: '🚀 30 Tage kostenlos testen', waAria: 'Schreib uns auf WhatsApp', info: 'Hallo! Ich hätte gerne Informationen zur digitalen Speisekarte mit QR-Code und zum kostenlosen 30-Tage-Test.', infoShort: 'Hallo! Ich hätte gerne Informationen zur digitalen Speisekarte mit QR-Code.',
    ck: 'Diese Website verwendet nur technische Cookies, die für den Betrieb nötig sind: kein Profiling, keine Statistiken, keine Werbung.', ckMore: 'Mehr erfahren', ckOk: 'Ok, verstanden', ckAria: 'Cookie-Hinweis'},
  fr: {open: 'Ouvrir le menu', close: 'Fermer le menu', trial: 'Bonjour Fabio ! Je voudrais activer l\u2019essai gratuit de 30 jours du menu digital{m}.', model: ' avec le modèle {n}', bar: 'Essai gratuit', barBtn: '🚀 Essai gratuit 30 jours', waAria: 'Écrivez-nous sur WhatsApp', info: 'Bonjour ! Je voudrais des informations sur le menu digital avec QR code et l\u2019essai gratuit de 30 jours.', infoShort: 'Bonjour ! Je voudrais des informations sur le menu digital avec QR code.',
    ck: 'Ce site utilise uniquement des cookies techniques, nécessaires à son fonctionnement : ni profilage, ni statistiques, ni publicité.', ckMore: 'En savoir plus', ckOk: 'Ok, compris', ckAria: 'Avis sur les cookies'}
};
var LANG = (document.documentElement.lang || 'it').slice(0, 2);
var T = I18N[LANG] || I18N.it;
var ROOT = LANG === 'it' ? '/' : '/' + LANG + '/';
$$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

/* ---------- Navigazione ---------- */
var nav = $('#nav'), burger = $('#burger'), waFab = $('#wa-fab');
function onScroll() {
  if (nav) nav.classList.toggle('scrolled', scrollY > 10);
  if (waFab) waFab.classList.toggle('show', scrollY > 500);
}
addEventListener('scroll', onScroll, {passive: true}); onScroll();
function closeNav() { if (!nav) return; nav.classList.remove('open'); if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', T.open); } }
if (burger) burger.addEventListener('click', function () {
  var o = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? T.close : T.open);
});
$$('.links a').forEach(function (a) { a.addEventListener('click', closeNav); });
/* Selettore lingua: si chiude toccando fuori o con Esc */
document.addEventListener('click', function (e) { $$('details.lang[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); }); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') $$('details.lang[open]').forEach(function (d) { d.removeAttribute('open'); }); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

/* Barra di avanzamento per i browser senza animazioni legate allo scroll */
if (!(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()'))) {
  var pr = $('.progress');
  if (pr) addEventListener('scroll', function () { var h = document.documentElement.scrollHeight - innerHeight; pr.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; }, {passive: true});
}

/* ---------- Comparse ---------- */
if (reduced || !('IntersectionObserver' in window)) { $$('.rv').forEach(function (e) { e.classList.add('in'); }); }
else {
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold: .12, rootMargin: '0px 0px -40px 0px'});
  $$('.rv').forEach(function (e) { io.observe(e); });
}

/* ---------- Luce che segue il mouse ---------- */
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
  var gc = $('.glow-cursor'), raf = 0, mx = 0, my = 0;
  if (gc) addEventListener('pointermove', function (e) {
    mx = e.clientX; my = e.clientY; gc.style.opacity = 1;
    if (!raf) raf = requestAnimationFrame(function () { gc.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; raf = 0; });
  }, {passive: true});
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.card'); if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, {passive: true});
}

/* ---------- Onda sui pulsanti ---------- */
document.addEventListener('pointerdown', function (e) {
  var b = e.target.closest && e.target.closest('.btn-main'); if (!b || reduced) return;
  var r = b.getBoundingClientRect(), s = document.createElement('span');
  s.className = 'ripple'; s.style.left = (e.clientX - r.left) + 'px'; s.style.top = (e.clientY - r.top) + 'px';
  b.appendChild(s); setTimeout(function () { s.remove(); }, 650);
});

/* ---------- Pulsanti "Prova gratis" → WhatsApp con messaggio pronto ---------- */
/* Ogni [data-open] apre la chat WhatsApp; data-model="Nome" aggiunge il modello scelto. */
function trialLink(model) {
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(T.trial.replace('{m}', model ? T.model.replace('{n}', model) : ''));
}
/* Arrivo da un modello: ?modello=Nome lo aggiunge al messaggio */
var urlModel = '';
try { urlModel = (new URLSearchParams(location.search).get('modello') || '').slice(0, 60); } catch (err) {}
function wireTrial(a) {
  a.href = trialLink(a.getAttribute('data-model') || urlModel);
  a.target = '_blank'; a.rel = 'noopener';
}
$$('[data-open]').forEach(wireTrial);
document.addEventListener('click', function (e) {
  if (e.target.closest && e.target.closest('[data-open]')) closeNav();
});

/* ---------- Barra fissa "Prova gratis" su telefono ---------- */
/* Compare solo nelle pagine con un invito finale (.final), dopo la prima schermata,
   e sparisce quando è già visibile un altro pulsante di richiesta. */
(function () {
  if (!$('.final')) return;
  var bar = document.createElement('div');
  bar.className = 'm-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', T.bar);
  bar.innerHTML = '<a class="btn btn-main" href="' + trialLink(urlModel) + '" data-open target="_blank" rel="noopener">' + T.barBtn + '</a>' +
    '<a class="m-wa" href="https://wa.me/' + WA + '" data-wa="' + T.info + '" target="_blank" rel="noopener" aria-label="' + T.waAria + '">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 4.9-1.3A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.33-2 1.38-.53.05-1.03.24-3.47-.72-2.93-1.16-4.8-4.15-4.95-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.25.58.83 2.01.9 2.16.08.14.12.31.03.5-.1.2-.14.31-.29.48l-.43.5c-.14.15-.3.31-.13.6.17.3.75 1.24 1.6 2 1.1.98 2.03 1.28 2.32 1.43.29.14.46.12.63-.08.17-.19.73-.85.92-1.14.2-.29.39-.24.65-.14.27.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.7-.18 1.38Z"/></svg></a>';
  document.body.appendChild(bar);
  document.body.classList.add('has-mbar');
  var seen = 0, blockers = $$('.hero-cta, .offer, .final, footer, .page-hero .btn-main');
  function upd() { bar.classList.toggle('show', scrollY > innerHeight * 0.8 && !seen); }
  if ('IntersectionObserver' in window) {
    var vis = new Set();
    var ob = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) vis.add(e.target); else vis.delete(e.target); });
      seen = vis.size; upd();
    });
    blockers.forEach(function (b) { ob.observe(b); });
  }
  addEventListener('scroll', upd, {passive: true}); upd();
})();

/* ---------- Avviso cookie ----------
   Il sito usa solo cookie/memoria tecnici: basta un avviso informativo, mostrato alla
   prima visita e chiuso con "Ok" (la scelta resta nella memoria del browser). */
(function () {
  var KEY = 'dsf-cookie-ok';
  try { if (localStorage.getItem(KEY)) return; } catch (err) {}
  var ck = document.createElement('div');
  ck.className = 'ck'; ck.setAttribute('role', 'region'); ck.setAttribute('aria-label', T.ckAria);
  ck.innerHTML = '<p><span aria-hidden="true">🍪</span> ' + T.ck + ' <a href="' + ROOT + 'privacy#cookies">' + T.ckMore + '</a></p><button type="button" class="btn btn-main">' + T.ckOk + '</button>';
  ck.querySelector('button').addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1'); } catch (err) {}
    ck.classList.remove('show'); setTimeout(function () { ck.remove(); }, 400);
  });
  document.body.appendChild(ck);
  requestAnimationFrame(function () { ck.classList.add('show'); });
})();

/* Link WhatsApp generici con messaggio pronto */
$$('[data-wa]').forEach(function (a) {
  a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(a.getAttribute('data-wa') || T.infoShort);
});
})();
