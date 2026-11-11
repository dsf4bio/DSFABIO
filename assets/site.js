/* =========================================================
   DS Service · script comune a tutte le pagine
   - menu mobile, barra di avanzamento, comparse, luce del mouse
   - pulsanti "Prova gratis" [data-open]: aprono il modulo di attivazione /attiva
     Un pulsante può indicare il modello scelto: data-model="MDC-001 · Gusto 360°"
   ========================================================= */
(function () {
'use strict';
var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function (s, c) { return (c || document).querySelector(s); };
var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
document.body.classList.remove('no-js');

/* ---------- Testi degli script nelle 6 lingue del sito (<html lang>) ---------- */
var I18N = {
  it: {open: 'Apri il menu', close: 'Chiudi il menu',  bar: 'Prova gratuita', barBtn: '🚀 Prova gratis 30 giorni',
    ck: 'Questo sito usa solo cookie tecnici, necessari a farlo funzionare: niente profilazione, statistiche o pubblicità.', ckMore: 'Informativa', ckOk: 'Ok, ho capito', ckAria: 'Avviso sui cookie'},
  en: {open: 'Open menu', close: 'Close menu',  bar: 'Free trial', barBtn: '🚀 Try it free for 30 days',
    ck: 'This site only uses technical cookies needed to make it work: no profiling, analytics or advertising.', ckMore: 'Learn more', ckOk: 'Ok, got it', ckAria: 'Cookie notice'},
  es: {open: 'Abrir el menú', close: 'Cerrar el menú',  bar: 'Prueba gratuita', barBtn: '🚀 Prueba gratis 30 días',
    ck: 'Este sitio solo usa cookies técnicas, necesarias para su funcionamiento: sin perfiles, estadísticas ni publicidad.', ckMore: 'Más información', ckOk: 'Vale, entendido', ckAria: 'Aviso de cookies'},
  pt: {open: 'Abrir o menu', close: 'Fechar o menu',  bar: 'Teste gratuito', barBtn: '🚀 Teste grátis por 30 dias',
    ck: 'Este site usa apenas cookies técnicos, necessários para o seu funcionamento: sem criação de perfis, estatísticas ou publicidade.', ckMore: 'Saiba mais', ckOk: 'Ok, entendi', ckAria: 'Aviso sobre cookies'},
  de: {open: 'Menü öffnen', close: 'Menü schließen',  bar: 'Kostenloser Test', barBtn: '🚀 30 Tage kostenlos testen',
    ck: 'Diese Website verwendet nur technische Cookies, die für den Betrieb nötig sind: kein Profiling, keine Statistiken, keine Werbung.', ckMore: 'Mehr erfahren', ckOk: 'Ok, verstanden', ckAria: 'Cookie-Hinweis'},
  fr: {open: 'Ouvrir le menu', close: 'Fermer le menu',  bar: 'Essai gratuit', barBtn: '🚀 Essai gratuit 30 jours',
    ck: 'Ce site utilise uniquement des cookies techniques, nécessaires à son fonctionnement : ni profilage, ni statistiques, ni publicité.', ckMore: 'En savoir plus', ckOk: 'Ok, compris', ckAria: 'Avis sur les cookies'}
};
var LANG = (document.documentElement.lang || 'it').slice(0, 2);
var T = I18N[LANG] || I18N.it;
var ROOT = LANG === 'it' ? '/' : '/' + LANG + '/';
$$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

/* ---------- Navigazione ---------- */
var nav = $('#nav'), burger = $('#burger');
function onScroll() {
  if (nav) nav.classList.toggle('scrolled', scrollY > 10);
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

/* ---------- Pulsanti "Prova gratis" → modulo di attivazione ---------- */
/* Ogni [data-open] apre /attiva; data-model="Nome" porta con sé il modello scelto. */
function trialLink(model) {
  return '/attiva' + (model ? '?modello=' + encodeURIComponent(model) : '');
}
/* Arrivo da un modello: ?modello=Nome lo passa al modulo */
var urlModel = '';
try { urlModel = (new URLSearchParams(location.search).get('modello') || '').slice(0, 60); } catch (err) {}
function wireTrial(a) {
  a.href = trialLink(a.getAttribute('data-model') || urlModel);
  a.removeAttribute('target'); a.removeAttribute('rel');
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
  bar.innerHTML = '<a class="btn btn-main" href="' + trialLink(urlModel) + '" data-open>' + T.barBtn + '</a>';
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

})();
