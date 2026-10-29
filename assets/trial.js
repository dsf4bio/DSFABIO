/* =========================================================
   DSFabio Digital · componente per le ANTEPRIME dei modelli
   Uso: <script src="assets/trial.js" data-model="Nome modello" defer></script>
   - aggiunge in fondo alla pagina una call to action
   - aggiunge un pulsante "Provalo gratis" nella fascia in alto (.demo)
   - apre la finestra di richiesta direttamente qui, senza cambiare pagina
   ========================================================= */
(function () {
'use strict';
var WA = '393440301412';
var me = document.querySelector('script[data-model]');
var MODEL = (me && me.getAttribute('data-model')) || document.title.split('·')[0].trim();
var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

var CSS = [
'.dsf,.dsf *{box-sizing:border-box}',
'.dsf{--dsf-bg:#0d0a1f;--dsf-card:rgba(255,255,255,.06);--dsf-line:rgba(255,255,255,.14);--dsf-txt:#f4f1ff;--dsf-sub:#b9b2d8;--dsf-g:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee);font-family:Manrope,system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--dsf-txt);line-height:1.5}',
'.dsf button,.dsf input,.dsf textarea{font-family:inherit;color:inherit}',
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
'.dsf-pill{display:inline-flex;align-items:center;gap:6px;margin-left:8px;padding:3px 11px;border-radius:999px;border:0;cursor:pointer;font:inherit;font-weight:800;font-size:.72rem;color:#0d0a1f;background:linear-gradient(120deg,#ff3cac,#7b5cff,#22d3ee);vertical-align:middle}',
'@media (max-width:560px){.dsf-pts{grid-template-columns:1fr}.dsf-btn{width:100%}.dsf-pill{display:flex;width:max-content;margin:6px auto 0}}',
/* Finestra */
'dialog.dsf-dlg{margin:auto;border:1px solid var(--dsf-line);border-radius:28px;background:#16112f;color:var(--dsf-txt);width:calc(100% - 24px);max-width:500px;max-height:calc(100vh - 120px);max-height:calc(100dvh - 120px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:0}',
'dialog.dsf-dlg::backdrop{background:rgba(5,3,15,.7);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}',
'dialog.dsf-dlg[open]{animation:dsfpop .45s cubic-bezier(.2,.9,.2,1)}',
'@keyframes dsfpop{from{opacity:0;transform:translateY(30px) scale(.96)}}',
'.dsf-dc{position:relative;padding:28px 20px 22px}',
'.dsf-x{position:absolute;top:12px;right:12px;width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.1);color:#fff;font-size:1.5rem;line-height:1;cursor:pointer}',
'.dsf-dlg h2{font-size:1.55rem;line-height:1.1;margin:0 44px 6px 0;font-weight:800}',
'.dsf-dlg .sub{color:var(--dsf-sub);font-size:.92rem;margin:0 0 12px}',
'.dsf-tag{display:inline-block;margin-bottom:14px;padding:5px 12px;border-radius:999px;font-size:.78rem;font-weight:800;background:rgba(34,211,238,.15);color:#22d3ee}',
'.dsf-form{display:grid;gap:11px}',
'.dsf-f label{display:block;font-size:.84rem;font-weight:700;margin-bottom:5px}',
'.dsf-f input,.dsf-f textarea{width:100%;padding:12px 14px;border-radius:14px;border:1px solid var(--dsf-line);background:rgba(255,255,255,.06);color:#fff;font-size:16px;transition:border-color .2s}',
'.dsf-f input:focus,.dsf-f textarea:focus{outline:none;border-color:#22d3ee}',
'.dsf-f textarea{min-height:76px;resize:vertical}',
'.dsf-two{display:grid;grid-template-columns:1fr 1fr;gap:11px}',
'@media (max-width:440px){.dsf-two{grid-template-columns:1fr}}',
'.dsf-consent{display:flex;gap:10px;align-items:flex-start;font-size:.82rem;color:var(--dsf-sub);line-height:1.45}',
'.dsf-consent input{margin-top:3px;width:18px;height:18px;flex:0 0 auto;accent-color:#ff3cac}',
'.dsf-consent a{color:#22d3ee}',
'.dsf-send{width:100%;padding:15px;border:0;border-radius:999px;font-weight:800;font-size:1rem;cursor:pointer;background:#25D366;color:#06260f;box-shadow:0 10px 26px rgba(37,211,102,.35)}',
'.dsf-hint{font-size:.76rem;color:var(--dsf-sub);text-align:center;margin:0}',
'.dsf-ok{text-align:center;padding:14px 0 4px}',
'.dsf-ok .big{font-size:3.2rem;line-height:1;margin-bottom:8px}',
'.dsf-ok a{color:#22d3ee;font-weight:800}',
'.dsf [hidden]{display:none!important}',
'dialog.dsf-dlg{background:#f7f5ff!important;color:#1b1638!important;border-color:rgba(123,92,255,.28)!important;color-scheme:light;box-shadow:0 30px 80px rgba(0,0,0,.45)}',
'.dsf-dlg h2{color:#1b1638}',
'.dsf-dlg .sub{color:#4a4470!important}',
'.dsf-dlg .sub strong{color:#1b1638}',
'.dsf-x{background:#e9e4fb!important;color:#1b1638!important}',
'.dsf-tag{background:#dff6f9!important;color:#0b6f7d!important}',
'.dsf-f label{color:#2a2450}',
'.dsf-f input,.dsf-f textarea{background:#fff!important;color:#1b1638!important;border:1.5px solid #cdc5ec!important}',
'.dsf-f input::placeholder,.dsf-f textarea::placeholder{color:#8d87ad;opacity:1}',
'.dsf-f input:focus,.dsf-f textarea:focus{border-color:#7b5cff!important;box-shadow:0 0 0 4px rgba(123,92,255,.18)}',
'.dsf-consent{color:#4a4470!important}',
'.dsf-consent a,.dsf-ok a{color:#5b3fd9!important;font-weight:700}',
'.dsf-consent input{accent-color:#7b5cff!important}',
'.dsf-hint{color:#625c88!important}',
'.dsf-hint strong{color:#1b1638}',
'.dsf-send{color:#053d1a!important}',
'@media (prefers-reduced-motion:reduce){.dsf *{animation:none!important;transition:none!important}}'
].join('\n');

/* Blocca lo sfondo mentre la finestra è aperta (funziona anche su iPhone) */
var __lockY = 0;
function lockPage() {
  __lockY = window.scrollY || window.pageYOffset;
  var b = document.body, h = document.documentElement;
  h.style.scrollBehavior = 'auto';
  b.style.position = 'fixed'; b.style.top = -__lockY + 'px'; b.style.left = '0'; b.style.right = '0'; b.style.width = '100%';
  h.style.overflow = 'hidden';
}
function unlockPage() {
  var b = document.body, h = document.documentElement;
  b.style.position = ''; b.style.top = ''; b.style.left = ''; b.style.right = ''; b.style.width = '';
  h.style.overflow = '';
  window.scrollTo(0, __lockY);
  setTimeout(function () { h.style.scrollBehavior = ''; }, 50);
}
function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
function waLink(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }

function init() {
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* Call to action in fondo */
  var cta = el(
  '<section class="dsf dsf-cta" aria-labelledby="dsf-cta-t"><div class="in">' +
    '<span class="dsf-eye">Ti piace questo menu?</span>' +
    '<h2 id="dsf-cta-t">Questo menu può essere <span class="dsf-gt">il tuo</span>, già da dopodomani</h2>' +
    '<p class="lead">Mandaci il tuo menu, anche solo in foto: lo prepariamo noi con i tuoi piatti, il tuo logo e i tuoi colori. Tu stampi il QR e lo metti sui tavoli.</p>' +
    '<ul class="dsf-pts"><li><b>48 ore</b>e il menu è online</li><li><b>30 giorni</b>di prova gratis</li><li><b>190 €/anno</b>tutto incluso</li></ul>' +
    '<div class="dsf-btns"><button type="button" class="dsf-btn dsf-main" data-dsf-open>🚀 Prova gratis il modello ' + MODEL.replace(/</g, '&lt;') + '</button>' +
    '<a class="dsf-btn dsf-wa" href="' + waLink('Ciao! Ho visto il modello ' + MODEL + ' e vorrei qualche informazione sul menu digitale.') + '" target="_blank" rel="noopener">💬 Scrivici su WhatsApp</a></div>' +
    '<span class="dsf-small">Nessun impegno · nessun dato di pagamento · disdici quando vuoi</span>' +
    '<a class="dsf-link" href="modelli.html">← Guarda gli altri modelli</a>' +
  '</div></section>');
  document.body.appendChild(cta);

  /* Pulsante nella fascia "modello dimostrativo" */
  var bar = document.querySelector('.demo, .demo-bar');
  if (bar && !bar.querySelector('.dsf-pill')) {
    var pill = el('<button type="button" class="dsf-pill" data-dsf-open>✨ Provalo gratis</button>');
    bar.appendChild(pill);
  }

  /* Finestra di richiesta */
  var dlg = el(
  '<dialog class="dsf dsf-dlg" aria-labelledby="dsf-t"><div class="dsf-dc">' +
    '<button type="button" class="dsf-x" data-dsf-close aria-label="Chiudi">×</button>' +
    '<div class="dsf-body"><h2 id="dsf-t">Prova gratis questo menu</h2>' +
    '<p class="sub">30 giorni gratis dalla consegna, poi 190 €/anno tutto incluso. Nessun impegno.</p>' +
    '<span class="dsf-tag">🎨 Modello scelto: ' + MODEL.replace(/</g, '&lt;') + '</span>' +
    '<form class="dsf-form" novalidate>' +
      '<div class="dsf-f"><label for="dsf-locale">Nome del locale *</label><input id="dsf-locale" name="locale" type="text" required autocomplete="organization" placeholder="Es. Trattoria Da Mario"></div>' +
      '<div class="dsf-two"><div class="dsf-f"><label for="dsf-nome">Nome e cognome *</label><input id="dsf-nome" name="nome" type="text" required autocomplete="name" placeholder="Il tuo nome"></div>' +
      '<div class="dsf-f"><label for="dsf-citta">Città *</label><input id="dsf-citta" name="citta" type="text" required autocomplete="address-level2" placeholder="Es. Bologna"></div></div>' +
      '<div class="dsf-two"><div class="dsf-f"><label for="dsf-tel">WhatsApp / telefono *</label><input id="dsf-tel" name="telefono" type="tel" required autocomplete="tel" inputmode="tel" pattern="[0-9+ ]{8,16}" placeholder="333 1234567"></div>' +
      '<div class="dsf-f"><label for="dsf-email">Email</label><input id="dsf-email" name="email" type="email" autocomplete="email" placeholder="Facoltativa"></div></div>' +
      '<div class="dsf-f"><label for="dsf-msg">Messaggio</label><textarea id="dsf-msg" name="messaggio" maxlength="500" placeholder="Facoltativo. Es. che tipo di locale hai, quanti piatti…"></textarea></div>' +
      '<label class="dsf-consent"><input type="checkbox" name="consenso" required><span>Ho letto l\'<a href="privacy.html#privacy" target="_blank" rel="noopener">informativa privacy</a> e acconsento al trattamento dei miei dati per essere ricontattato/a. *</span></label>' +
      '<button type="submit" class="dsf-send">📲 Invia la richiesta su WhatsApp</button>' +
      '<p class="dsf-hint">Si aprirà WhatsApp con il messaggio già pronto: premi <strong>Invia</strong> per completare.</p>' +
    '</form></div>' +
    '<div class="dsf-ok" hidden><div class="big" aria-hidden="true">🎉</div><h2 style="margin:0 0 8px">Ci siamo quasi!</h2>' +
    '<p class="sub">Si è aperta la chat WhatsApp con la tua richiesta: premi <strong>Invia</strong> per mandarcela. Poi mandaci anche una foto del tuo menu.</p>' +
    '<p class="dsf-hint">WhatsApp non si è aperto? <a class="dsf-walink" href="#" target="_blank" rel="noopener">Clicca qui</a>.</p></div>' +
  '</div></dialog>');
  document.body.appendChild(dlg);
  var form = dlg.querySelector('form'), body = dlg.querySelector('.dsf-body'), ok = dlg.querySelector('.dsf-ok');

  function open() {
    body.hidden = false; ok.hidden = true;
    if (dlg.showModal) { if (!dlg.open) { dlg.showModal(); lockPage(); dlg.scrollTop = 0; } }
    else location.href = waLink('Ciao! Vorrei la prova gratuita del menu digitale, modello ' + MODEL + '.');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-dsf-open]');
    if (t) { e.preventDefault(); open(); }
  });
  dlg.querySelector('[data-dsf-close]').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', unlockPage);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var v = function (n) { return form.elements[n].value.trim(); };
    var txt = [
      '🚀 Richiesta prova gratuita (30 giorni)',
      '🎨 Modello: ' + MODEL,
      '🏠 Locale: ' + v('locale'),
      '👤 Nome: ' + v('nome'),
      '📍 Città: ' + v('citta'),
      '📱 WhatsApp: ' + v('telefono'),
      '📧 Email: ' + (v('email') || '—'),
      '💬 Messaggio: ' + (v('messaggio') || '—'),
      '✅ Consenso privacy: sì',
      '(dall\'anteprima del modello)'
    ].join('\n');
    var url = waLink(txt);
    dlg.querySelector('.dsf-walink').href = url;
    body.hidden = true; ok.hidden = false;
    window.open(url, '_blank', 'noopener');
    form.reset();
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
