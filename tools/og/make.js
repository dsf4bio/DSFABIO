// Immagine di anteprima (social ed email) per ogni lingua: node tools/og/make.js
const {chromium}=require('playwright'); const path=require('path');
const T={
 it:{a:'Menu digitale',b:'con QR code',sub:'per il tuo ristorante',feat:'Allergeni · Più lingue · Aggiornamenti inclusi',pill:'30 giorni gratis · poi <s>199 €</s> 169 €/anno'},
 en:{a:'Digital menu',b:'with QR code',sub:'for your restaurant',feat:'Allergens · Multiple languages · Updates included',pill:'30 days free · then <s>$229</s> $199/year'},
 es:{a:'Menú digital',b:'con código QR',sub:'para tu restaurante',feat:'Alérgenos · Varios idiomas · Actualizaciones incluidas',pill:'30 días gratis · luego <s>199 €</s> 169 €/año'},
 pt:{a:'Cardápio digital',b:'com QR code',sub:'para o seu restaurante',feat:'Alérgenos · Vários idiomas · Atualizações incluídas',pill:'30 dias grátis · depois <s>US$ 229</s> US$ 199/ano'},
 de:{a:'Digitale Speisekarte',b:'mit QR-Code',sub:'für dein Restaurant',feat:'Allergene · Mehrere Sprachen · Updates inklusive',pill:'30 Tage gratis · dann <s>199 €</s> 169 €/Jahr'},
 fr:{a:'Menu digital',b:'avec QR code',sub:'pour votre restaurant',feat:'Allergènes · Plusieurs langues · Mises à jour incluses',pill:'30 jours gratuits · puis <s>199 €</s> 169 €/an'},
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:630}});
await p.goto('file://'+path.join(__dirname,'og.html'));await p.evaluate(()=>document.fonts.ready);
const only=process.argv[2];
for(const [l,t] of Object.entries(T)){ if(only?only!==l:l==='it') continue; // l'italiano resta og-image.png (originale)
 await p.evaluate(t=>fill(t),t);await p.waitForTimeout(150);
 const out=path.join(__dirname,'..','..',l==='it'?'og-image.png':'og-image-'+l+'.png');
 await p.screenshot({path:out});console.log(out);}
await b.close();})();
