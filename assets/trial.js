/* =========================================================
   DS Service · componente per le ANTEPRIME dei modelli
   Uso: <script src="assets/trial.js" data-model="Nome modello" defer></script>
   - aggiunge in fondo alla pagina una call to action
   - aggiunge un pulsante "Provalo gratis" nella fascia in alto (.demo)
   - i pulsanti di prova aprono il modulo di attivazione /attiva con il modello scelto
   - dentro un iframe (anteprima in modelli) mostra solo il menu
   ========================================================= */
(function () {
'use strict';
var me = document.querySelector('script[data-model]');
var PREVIEW = window.self !== window.top || /[?&]anteprima\b/.test(location.search);
var MODEL = (me && me.getAttribute('data-model')) || document.title.split('·')[0].trim();

var CSS = [
'.dsf,.dsf *{box-sizing:border-box}',
'.dsf{--dsf-bg:#0d0a1f;--dsf-card:rgba(255,255,255,.06);--dsf-line:rgba(255,255,255,.14);--dsf-txt:#f4f1ff;--dsf-sub:#b9b2d8;--dsf-g:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee);font-family:Manrope,system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--dsf-txt);line-height:1.5}',
'.dsf-cta{position:relative;overflow:hidden;background:radial-gradient(70% 60% at 15% 0%,rgba(255,60,172,.35),transparent 60%),radial-gradient(70% 60% at 100% 100%,rgba(34,211,238,.28),transparent 60%),var(--dsf-bg);padding:64px 20px calc(70px + env(safe-area-inset-bottom));text-align:center}',
'.dsf-cta .in{max-width:680px;margin:0 auto}',
'.dsf-eye{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#22d3ee;margin-bottom:12px}',
'.dsf-cta h2{font-size:clamp(1.9rem,6.4vw,3rem);line-height:1.05;font-weight:800;margin:0 0 14px;letter-spacing:-.01em}',
'.dsf-gt{background:var(--dsf-g);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.dsf-cta p.lead{color:var(--dsf-sub);font-size:1.05rem;margin:0 auto 26px;max-width:520px}',
'.dsf-pts{list-style:none;padding:0;margin:0 0 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}',
'.dsf-pts li{background:var(--dsf-card);border:1px solid var(--dsf-line);border-radius:18px;padding:14px 10px;font-size:.88rem;color:var(--dsf-sub)}',
'.dsf-pts b{display:block;font-size:1.25rem;color:var(--dsf-txt);line-height:1.2}',
'.dsf-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}',
'.dsf-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:16px 26px;border-radius:999px;font-weight:800;text-decoration:none;border:0;cursor:pointer;font-size:1rem;transition:transform .2s,box-shadow .3s}',
'.dsf-btn:active{transform:scale(.96)}',
'.dsf-main{color:#0d0a1f;background:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee,#ff3cac);background-size:300% 100%;animation:dsfsheen 6s linear infinite;box-shadow:0 14px 36px rgba(255,60,172,.42)}',
'@keyframes dsfsheen{to{background-position:300% 0}}',
'.dsf-link{display:inline-block;margin-top:18px;color:#22d3ee;font-weight:800;text-decoration:none}',
'.dsf-small{display:block;margin-top:14px;font-size:.8rem;color:var(--dsf-sub)}',
'.dsf-pill{text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-left:8px;padding:3px 11px;border-radius:999px;border:0;cursor:pointer;font:inherit;font-weight:800;font-size:.72rem;color:#0d0a1f;background:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee);vertical-align:middle}',
'@media (max-width:560px){.dsf-pts{grid-template-columns:1fr}.dsf-btn{width:100%}.dsf-pill{display:flex;width:max-content;margin:6px auto 0}}',
'.dsf-ck{position:fixed;z-index:9999;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));max-width:560px;margin:0 auto;display:flex;gap:12px;align-items:center;padding:14px 16px;border-radius:20px;background:rgba(13,10,31,.95);border:1px solid var(--dsf-line);box-shadow:0 18px 50px rgba(0,0,0,.55)}',
'.dsf-ck p{margin:0;font-size:.85rem;line-height:1.45;color:var(--dsf-sub)}',
'.dsf-ck a{color:#22d3ee;font-weight:700}',
'.dsf-ck button{flex:0 0 auto;border:0;cursor:pointer;padding:11px 18px;border-radius:999px;font:inherit;font-weight:800;font-size:.88rem;color:#0d0a1f;background:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee)}',
'@media (max-width:560px){.dsf-ck{flex-direction:column;align-items:stretch}}',
'@media (prefers-reduced-motion:reduce){.dsf *{animation:none!important;transition:none!important}}'
].join('\n');

function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
/* Testi nella lingua della pagina (/en/mdc-001 ha <html lang="en">) */
var LANG = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2);
var TX = {
  it: {eye: 'Ti piace questo menu?', h: 'Questo menu può essere <span class="dsf-gt">il tuo</span>, già da domani',
    lead: 'Compila il modulo e allega il tuo menu, anche solo in foto: lo prepariamo noi con i tuoi piatti, il tuo logo e i tuoi colori. Tu stampi il QR e lo metti sui tavoli.',
    pts: ['<b>24 ore</b>e il menu è online', '<b>30 giorni</b>di prova gratis', '<b>169 €/anno</b>tutto incluso'],
    btn: '🚀 Prova gratis il modello ', small: 'Nessun pagamento anticipato · Prova senza impegno · Pronto in 24 ore',
    back: '← Guarda gli altri modelli', pill: '✨ Provalo gratis', ckL: 'Avviso sui cookie',
    ck: '🍪 Questo sito usa solo cookie tecnici, necessari a farlo funzionare: niente profilazione, statistiche o pubblicità.', ckI: 'Informativa', ok: 'Ok, ho capito'},
  en: {eye: 'Like this menu?', h: 'This menu can be <span class="dsf-gt">yours</span>, as soon as tomorrow',
    lead: 'Fill in the form and attach your menu, even just a photo: we set it up with your dishes, your logo and your colours. You print the QR code and put it on the tables.',
    pts: ['<b>24 hours</b>and your menu is online', '<b>30 days</b>free trial', '<b>€169/year</b>all included'],
    btn: '🚀 Try the template for free: ', small: 'No upfront payment · No commitment · Ready in 24 hours',
    back: '← See the other templates', pill: '✨ Try it free', ckL: 'Cookie notice',
    ck: '🍪 This site only uses technical cookies needed to make it work: no profiling, statistics or advertising.', ckI: 'Policy', ok: 'OK, got it'},
  es: {eye: '¿Te gusta este menú?', h: 'Este menú puede ser <span class="dsf-gt">el tuyo</span>, desde mañana',
    lead: 'Rellena el formulario y adjunta tu carta, aunque sea en foto: la preparamos nosotros con tus platos, tu logotipo y tus colores. Tú imprimes el QR y lo pones en las mesas.',
    pts: ['<b>24 horas</b>y el menú está en línea', '<b>30 días</b>de prueba gratis', '<b>169 €/año</b>todo incluido'],
    btn: '🚀 Prueba gratis la plantilla ', small: 'Sin pago por adelantado · Sin compromiso · Listo en 24 horas',
    back: '← Ver las otras plantillas', pill: '✨ Pruébalo gratis', ckL: 'Aviso de cookies',
    ck: '🍪 Este sitio solo usa cookies técnicas, necesarias para que funcione: nada de perfiles, estadísticas ni publicidad.', ckI: 'Información', ok: 'Vale, entendido'},
  pt: {eye: 'Gostou deste menu?', h: 'Este menu pode ser <span class="dsf-gt">o seu</span>, já amanhã',
    lead: 'Preencha o formulário e anexe o seu menu, nem que seja só uma foto: preparamo-lo com os seus pratos, o seu logótipo e as suas cores. Imprime o QR code e coloca-o nas mesas.',
    pts: ['<b>24 horas</b>e o menu está online', '<b>30 dias</b>de teste grátis', '<b>169 €/ano</b>tudo incluído'],
    btn: '🚀 Experimente grátis o modelo ', small: 'Nenhum pagamento antecipado · Sem compromisso · Pronto em 24 horas',
    back: '← Ver os outros modelos', pill: '✨ Experimente grátis', ckL: 'Aviso de cookies',
    ck: '🍪 Este site usa apenas cookies técnicos, necessários para funcionar: nada de criação de perfis, estatísticas ou publicidade.', ckI: 'Saiba mais', ok: 'Ok, percebi'},
  de: {eye: 'Gefällt dir diese Speisekarte?', h: 'Diese Speisekarte kann schon morgen <span class="dsf-gt">deine</span> sein',
    lead: 'Fülle das Formular aus und hänge deine Speisekarte an, auch nur als Foto: Wir erstellen sie mit deinen Gerichten, deinem Logo und deinen Farben. Du druckst den QR-Code und stellst ihn auf die Tische.',
    pts: ['<b>24 Stunden</b>und die Karte ist online', '<b>30 Tage</b>kostenlos testen', '<b>169 €/Jahr</b>alles inklusive'],
    btn: '🚀 Vorlage kostenlos testen: ', small: 'Keine Vorauszahlung · Unverbindlich · In 24 Stunden fertig',
    back: '← Die anderen Vorlagen ansehen', pill: '✨ Kostenlos testen', ckL: 'Cookie-Hinweis',
    ck: '🍪 Diese Website verwendet nur technische Cookies, die für den Betrieb nötig sind: kein Profiling, keine Statistiken, keine Werbung.', ckI: 'Mehr erfahren', ok: 'Ok, verstanden'},
  fr: {eye: 'Ce menu vous plaît ?', h: 'Ce menu peut être <span class="dsf-gt">le vôtre</span>, dès demain',
    lead: 'Remplissez le formulaire et joignez votre carte, même en photo : nous la préparons avec vos plats, votre logo et vos couleurs. Vous imprimez le QR code et le posez sur les tables.',
    pts: ['<b>24 heures</b>et le menu est en ligne', '<b>30 jours</b>d’essai gratuit', '<b>169 €/an</b>tout compris'],
    btn: '🚀 Essayez gratuitement le modèle ', small: 'Aucun paiement à l’avance · Sans engagement · Prêt en 24 heures',
    back: '← Voir les autres modèles', pill: '✨ Essai gratuit', ckL: 'Avis sur les cookies',
    ck: '🍪 Ce site utilise uniquement des cookies techniques, nécessaires à son fonctionnement : ni profilage, ni statistiques, ni publicité.', ckI: 'En savoir plus', ok: 'OK, compris'}
};
var L = TX[LANG] || TX.it;
var TRIAL = (TX[LANG] && LANG !== 'it' ? '/' + LANG : '') + '/attiva?modello=' + encodeURIComponent(MODEL);
var ESC = function (t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

/* ---------- Anteprima comandata dalla pagina che la contiene (dsmenu.it) ----------
   ?scorri → il menu scorre piano da solo, in giù e poi torna su.
   Messaggi accettati: {dsm:'scroll', y} · {dsm:'items'} (fino ai piatti) · {dsm:'open'} (apre la scheda del
   primo piatto) · {dsm:'close'} · {dsm:'auto', on}. Risponde {dsm:'ready'} quando il menu è pronto. */
function remote() {
  var auto = false, raf = 0, dir = 1, pause = 0, last = 0;
  var se = document.scrollingElement || document.documentElement;
  function ease(to, ms) {
    cancelAnimationFrame(raf); var from = se.scrollTop, t0 = performance.now();
    (function f(t) { var k = Math.min(1, (t - t0) / ms); k = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      se.scrollTop = from + (to - from) * k; if (k < 1) raf = requestAnimationFrame(f); else if (auto) loop(); })(t0);
  }
  function loop() {
    cancelAnimationFrame(raf); last = performance.now();
    (function f(t) {
      if (!auto) return;
      var dt = Math.min(64, t - last); last = t;
      var max = Math.min(se.scrollHeight - innerHeight, 3200);
      if (pause > 0) pause -= dt;
      else if (dir > 0) { se.scrollTop += dt * .035; if (se.scrollTop >= max - 1) { dir = -1; pause = 1600; } }
      else { auto = false; ease(0, 2600); setTimeout(function () { auto = true; dir = 1; pause = 1800; loop(); }, 2700); return; }
      raf = requestAnimationFrame(f);
    })(last);
  }
  function first() {
    var sel = ['.card[data-k]', '[data-c][data-i]', '.dish', '.item', '.card', 'main button', 'main li'];
    for (var i = 0; i < sel.length; i++) { var e = document.querySelector(sel[i]); if (e && e.offsetParent !== null) return e; }
    return null;
  }
  function items() { var e = first(); return e ? Math.max(0, e.getBoundingClientRect().top + se.scrollTop - innerHeight * .28) : 0; }
  addEventListener('message', function (ev) {
    if (!/^https:\/\/(www\.)?(dsmenu\.it|dsfabio\.com)$|^http:\/\/(localhost|127\.0\.0\.1|dsm\.local)(:\d+)?$/.test(ev.origin)) return;
    var m = ev.data || {}; if (!m.dsm) return;
    if (m.dsm === 'auto') { auto = !!m.on; dir = 1; pause = 0; if (auto) loop(); else cancelAnimationFrame(raf); }
    else if (m.dsm === 'scroll') { auto = false; ease(+m.y || 0, m.ms || 1200); }
    else if (m.dsm === 'items') { auto = false; ease(items(), m.ms || 1200); }
    else if (m.dsm === 'open') { var e = first(); if (e) e.click(); }
    else if (m.dsm === 'close') { if (window.Piatti && Piatti.close) Piatti.close(); }
  });
  var SCORRI = /[?&]scorri\b/.test(location.search), idle = 0;
  // se chi guarda scorre o tocca il menu, lo scorrimento automatico si ferma e riparte dopo qualche secondo
  function hold() {
    if (!SCORRI) return;
    auto = false; cancelAnimationFrame(raf); clearTimeout(idle);
    idle = setTimeout(function wake() {
      if (document.documentElement.style.overflow === 'hidden') { idle = setTimeout(wake, 2000); return; } // scheda del piatto aperta
      auto = true; dir = 1; pause = 600; loop();
    }, 6000);
  }
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (ev) { addEventListener(ev, hold, {passive: true}); });
  function ready() { try { parent.postMessage({dsm: 'ready'}, '*'); } catch (e) {} if (SCORRI) { auto = true; pause = 1500; loop(); } }
  if (document.readyState === 'complete') setTimeout(ready, 300); else addEventListener('load', function () { setTimeout(ready, 300); });
}

function init() {
  /* Dentro l'anteprima della pagina Modelli (iframe): solo il menu, senza fascia demo né invito */
  if (PREVIEW) {
    document.documentElement.classList.add('dsf-preview');
    var ps = document.createElement('style');
    ps.textContent = '.demo,.demo-bar{display:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}';
    document.head.appendChild(ps);
    remote();
    return;
  }
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* Call to action in fondo */
  var cta = el(
  '<section class="dsf dsf-cta" aria-labelledby="dsf-cta-t"><div class="in">' +
    '<span class="dsf-eye">' + L.eye + '</span>' +
    '<h2 id="dsf-cta-t">' + L.h + '</h2>' +
    '<p class="lead">' + L.lead + '</p>' +
    '<ul class="dsf-pts"><li>' + L.pts.join('</li><li>') + '</li></ul>' +
    '<div class="dsf-btns"><a class="dsf-btn dsf-main" href="' + ESC(TRIAL) + '">' + L.btn + ESC(MODEL) + '</a></div>' +
    '<span class="dsf-small">' + L.small + '</span>' +
    '<a class="dsf-link" href="modelli">' + L.back + '</a>' +
  '</div></section>');
  document.body.appendChild(cta);

  /* Pulsante nella fascia "modello dimostrativo" */
  var bar = document.querySelector('.demo, .demo-bar');
  if (bar && !bar.querySelector('.dsf-pill')) {
    var pill = el('<a class="dsf-pill" href="' + ESC(TRIAL) + '" target="_top">' + L.pill + '</a>');
    bar.appendChild(pill);
  }

  /* Avviso cookie (stessa scelta salvata del resto del sito) */
  var seen = false;
  try { seen = !!localStorage.getItem('dsf-cookie-ok'); } catch (err) {}
  if (!seen) {
    var ck = el('<div class="dsf dsf-ck" role="region" aria-label="' + L.ckL + '"><p>' + L.ck + ' <a href="privacy#cookies">' + L.ckI + '</a></p><button type="button">' + L.ok + '</button></div>');
    ck.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem('dsf-cookie-ok', '1'); } catch (err) {}
      ck.remove();
    });
    document.body.appendChild(ck);
  }
}
// Anteprima dentro la home di dsmenu.it (altro sito): la pagina che contiene il menu
// non può farlo scorrere da fuori, quindi lo chiede con un messaggio.
var SCROLL_FROM = ['https://dsmenu.it', 'https://www.dsmenu.it', 'https://dsfabio.com', 'https://www.dsfabio.com'];
if (PREVIEW) window.addEventListener('message', function (e) {
  var d = e.data || {};
  if (d.dsf !== 'scroll' || SCROLL_FROM.indexOf(e.origin) < 0 || !e.source) return;
  var doc = document.scrollingElement || document.documentElement;
  doc.style.scrollBehavior = 'auto';
  var max = Math.min(doc.scrollHeight - window.innerHeight, d.max || 2200), dur = d.dur || 6500, t0 = 0;
  var reply = function () { try { e.source.postMessage({ dsf: 'scrolled' }, e.origin); } catch (err) {} };
  if (max < 50) return reply();
  (function step(t) {
    if (!t0) t0 = t;
    var k = Math.min(1, (t - t0) / dur), q = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    window.scrollTo(0, max * q);
    if (k < 1) requestAnimationFrame(step); else reply();
  })(performance.now());
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
