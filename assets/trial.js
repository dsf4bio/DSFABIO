/* =========================================================
   DSFabio Digital · componente per le ANTEPRIME dei modelli
   Uso: <script src="assets/trial.js" data-model="Nome modello" defer></script>
   - aggiunge in fondo alla pagina una call to action
   - aggiunge un pulsante "Provalo gratis" nella fascia in alto (.demo)
   - i pulsanti di prova aprono WhatsApp con il messaggio già pronto
   - dentro un iframe (anteprima in modelli) mostra solo il menu
   ========================================================= */
(function () {
'use strict';
var WA = '393440301412';
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
'.dsf-wa{background:#25D366;color:#06260f}',
'.dsf-link{display:inline-block;margin-top:18px;color:#22d3ee;font-weight:800;text-decoration:none}',
'.dsf-small{display:block;margin-top:14px;font-size:.8rem;color:var(--dsf-sub)}',
'.dsf-pill{text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-left:8px;padding:3px 11px;border-radius:999px;border:0;cursor:pointer;font:inherit;font-weight:800;font-size:.72rem;color:#0d0a1f;background:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee);vertical-align:middle}',
'@media (max-width:560px){.dsf-pts{grid-template-columns:1fr}.dsf-btn{width:100%}.dsf-pill{display:flex;width:max-content;margin:6px auto 0}}',
'@media (prefers-reduced-motion:reduce){.dsf *{animation:none!important;transition:none!important}}'
].join('\n');

function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
function waLink(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }
var TRIAL = waLink('Ciao Fabio! Vorrei attivare la prova gratuita di 30 giorni del menu digitale con il modello ' + MODEL + '.');
var ESC = function (t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

function init() {
  /* Dentro l'anteprima della pagina Modelli (iframe): solo il menu, senza fascia demo né invito */
  if (PREVIEW) {
    var ps = document.createElement('style');
    ps.textContent = '.demo,.demo-bar{display:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}';
    document.head.appendChild(ps);
    return;
  }
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* Call to action in fondo */
  var cta = el(
  '<section class="dsf dsf-cta" aria-labelledby="dsf-cta-t"><div class="in">' +
    '<span class="dsf-eye">Ti piace questo menu?</span>' +
    '<h2 id="dsf-cta-t">Questo menu può essere <span class="dsf-gt">il tuo</span>, già da dopodomani</h2>' +
    '<p class="lead">Mandaci il tuo menu, anche solo in foto: lo prepariamo noi con i tuoi piatti, il tuo logo e i tuoi colori. Tu stampi il QR e lo metti sui tavoli.</p>' +
    '<ul class="dsf-pts"><li><b>48 ore</b>e il menu è online</li><li><b>30 giorni</b>di prova gratis</li><li><b>190 €/anno</b>tutto incluso</li></ul>' +
    '<div class="dsf-btns"><a class="dsf-btn dsf-main" href="' + ESC(TRIAL) + '" target="_blank" rel="noopener">🚀 Prova gratis il modello ' + ESC(MODEL) + '</a>' +
    '<a class="dsf-btn dsf-wa" href="' + waLink('Ciao! Ho visto il modello ' + MODEL + ' e vorrei qualche informazione sul menu digitale.') + '" target="_blank" rel="noopener">💬 Scrivici su WhatsApp</a></div>' +
    '<span class="dsf-small">Nessun impegno · nessun dato di pagamento · disdici quando vuoi</span>' +
    '<a class="dsf-link" href="modelli">← Guarda gli altri modelli</a>' +
  '</div></section>');
  document.body.appendChild(cta);

  /* Pulsante nella fascia "modello dimostrativo" */
  var bar = document.querySelector('.demo, .demo-bar');
  if (bar && !bar.querySelector('.dsf-pill')) {
    var pill = el('<a class="dsf-pill" href="' + ESC(TRIAL) + '" target="_blank" rel="noopener">✨ Provalo gratis</a>');
    bar.appendChild(pill);
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
