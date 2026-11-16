#!/usr/bin/env python3
"""Messaggi che arrivano dal database (errori, avvisi, oggetto delle richieste) tradotti
nella lingua della pagina. Genera assets/msg.js: le pagine Attiva, Assistenza, Disdici,
Scheda e Blocca passano le risposte del database da window.dsMsg().

Uso: python3 tools/msg_i18n.py
Ordine delle lingue: en, es, pt, de, fr.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ['en', 'es', 'pt', 'de', 'fr']

M = {
# --- link e pagine con token ---------------------------------------------------------------
'Link non valido.': ('Invalid link.', 'Enlace no válido.', 'Link inválido.', 'Ungültiger Link.', 'Lien non valide.'),
'Link non valido. Chiedici di inviarti di nuovo la scheda: info@dsfabio.com.': (
  'Invalid link. Ask us to send you the sheet again: info@dsfabio.com.',
  'Enlace no válido. Pídenos que te enviemos de nuevo la ficha: info@dsfabio.com.',
  'Link inválido. Peça para enviarmos a ficha de novo: info@dsfabio.com.',
  'Ungültiger Link. Bitte uns, dir das Kundenblatt erneut zu senden: info@dsfabio.com.',
  'Lien non valide. Demandez-nous de vous renvoyer la fiche : info@dsfabio.com.'),
'Il link è scaduto. Chiedici di inviarti di nuovo la scheda: info@dsfabio.com.': (
  'The link has expired. Ask us to send you the sheet again: info@dsfabio.com.',
  'El enlace ha caducado. Pídenos que te enviemos de nuevo la ficha: info@dsfabio.com.',
  'O link expirou. Peça para enviarmos a ficha de novo: info@dsfabio.com.',
  'Der Link ist abgelaufen. Bitte uns, dir das Kundenblatt erneut zu senden: info@dsfabio.com.',
  'Le lien a expiré. Demandez-nous de vous renvoyer la fiche : info@dsfabio.com.'),
'Il link è scaduto. Se qualcosa non va scrivici subito a info@dsfabio.com.': (
  'The link has expired. If something is wrong, write to us right away at info@dsfabio.com.',
  'El enlace ha caducado. Si algo no va bien, escríbenos enseguida a info@dsfabio.com.',
  'O link expirou. Se algo não estiver certo, escreva-nos logo para info@dsfabio.com.',
  'Der Link ist abgelaufen. Wenn etwas nicht stimmt, schreib uns sofort an info@dsfabio.com.',
  'Le lien a expiré. Si quelque chose ne va pas, écrivez-nous tout de suite à info@dsfabio.com.'),
'Il link è scaduto: invia di nuovo la richiesta dal sito.': (
  'The link has expired: send the request again from the website.',
  'El enlace ha caducado: envía de nuevo la solicitud desde la web.',
  'O link expirou: envie o pedido de novo pelo site.',
  'Der Link ist abgelaufen: Sende die Anfrage erneut über die Website.',
  'Le lien a expiré : renvoyez la demande depuis le site.'),
'Questo link non è più valido: ti abbiamo inviato una scheda più recente. Se non la trovi scrivici a info@dsfabio.com.': (
  'This link is no longer valid: we have sent you a newer sheet. If you can’t find it, write to us at info@dsfabio.com.',
  'Este enlace ya no es válido: te hemos enviado una ficha más reciente. Si no la encuentras, escríbenos a info@dsfabio.com.',
  'Este link não é mais válido: enviamos uma ficha mais recente. Se não a encontrar, escreva-nos para info@dsfabio.com.',
  'Dieser Link ist nicht mehr gültig: Wir haben dir ein neueres Kundenblatt geschickt. Wenn du es nicht findest, schreib uns an info@dsfabio.com.',
  'Ce lien n’est plus valide : nous vous avons envoyé une fiche plus récente. Si vous ne la trouvez pas, écrivez-nous à info@dsfabio.com.'),
'Questo link è già stato usato o non è valido. Se hai già confermato, è tutto a posto: ti scriviamo noi.': (
  'This link has already been used or is not valid. If you have already confirmed, everything is fine: we’ll be in touch.',
  'Este enlace ya se ha usado o no es válido. Si ya lo has confirmado, todo está en orden: te escribimos nosotros.',
  'Este link já foi usado ou não é válido. Se já confirmou, está tudo certo: nós entraremos em contacto.',
  'Dieser Link wurde bereits verwendet oder ist ungültig. Wenn du schon bestätigt hast, ist alles in Ordnung: Wir melden uns.',
  'Ce lien a déjà été utilisé ou n’est pas valide. Si vous avez déjà confirmé, tout est en ordre : nous vous écrivons.'),
'La scheda è già stata scaricata il numero massimo di volte. Se non la trovi scrivici a info@dsfabio.com.': (
  'The sheet has already been downloaded the maximum number of times. If you can’t find it, write to us at info@dsfabio.com.',
  'La ficha ya se ha descargado el número máximo de veces. Si no la encuentras, escríbenos a info@dsfabio.com.',
  'A ficha já foi baixada o número máximo de vezes. Se não a encontrar, escreva-nos para info@dsfabio.com.',
  'Das Kundenblatt wurde bereits so oft wie möglich heruntergeladen. Wenn du es nicht findest, schreib uns an info@dsfabio.com.',
  'La fiche a déjà été téléchargée le nombre maximal de fois. Si vous ne la trouvez pas, écrivez-nous à info@dsfabio.com.'),
# --- disdetta -------------------------------------------------------------------------------
'Il rinnovo è con carta: per disdirlo usa il portale clienti di Stripe.': (
  'You renew by card: to cancel, use the Stripe customer portal.',
  'La renovación es con tarjeta: para cancelarla usa el portal de clientes de Stripe.',
  'A renovação é com cartão: para cancelar, use o portal do cliente da Stripe.',
  'Die Verlängerung läuft per Karte: Zum Kündigen nutze das Kundenportal von Stripe.',
  'Le renouvellement se fait par carte : pour le résilier, utilisez le portail client de Stripe.'),
"Il servizio non è attivo: non c'è niente da disdire.": (
  'The service is not active: there is nothing to cancel.',
  'El servicio no está activo: no hay nada que cancelar.',
  'O serviço não está ativo: não há nada para cancelar.',
  'Der Dienst ist nicht aktiv: Es gibt nichts zu kündigen.',
  'Le service n’est pas actif : il n’y a rien à résilier.'),
'La disdetta è stata fatta dal portale Stripe: annullala da lì.': (
  'The cancellation was made from the Stripe portal: undo it from there.',
  'La cancelación se hizo desde el portal de Stripe: anúlala desde allí.',
  'O cancelamento foi feito pelo portal da Stripe: desfaça-o por lá.',
  'Die Kündigung wurde über das Stripe-Portal gemacht: Widerrufe sie dort.',
  'La résiliation a été faite depuis le portail Stripe : annulez-la depuis là.'),
"Sei ancora nella prova gratuita: non c'è niente da disdire. Se non attivi l'abbonamento, alla fine della prova il menu si mette in pausa da solo.": (
  'You are still in the free trial: there is nothing to cancel. If you don’t activate the subscription, the menu pauses by itself at the end of the trial.',
  'Todavía estás en la prueba gratuita: no hay nada que cancelar. Si no activas la suscripción, al final de la prueba el menú se pausa solo.',
  'Ainda está no teste grátis: não há nada para cancelar. Se não ativar a subscrição, no fim do teste o menu é pausado sozinho.',
  'Du bist noch im kostenlosen Test: Es gibt nichts zu kündigen. Wenn du das Abo nicht aktivierst, pausiert die Speisekarte am Ende des Tests von selbst.',
  'Vous êtes encore en essai gratuit : il n’y a rien à résilier. Si vous n’activez pas l’abonnement, le menu se met en pause tout seul à la fin de l’essai.'),
# --- assistenza -----------------------------------------------------------------------------
'Inserisci il codice cliente.': ('Enter your customer code.', 'Introduce el código de cliente.', 'Digite o código de cliente.', 'Gib deinen Kundencode ein.', 'Saisissez le code client.'),
'Codice cliente non valido. Controlla il codice riportato sulla scheda che ti abbiamo consegnato.': (
  'Invalid customer code. Check the code on the sheet we gave you.',
  'Código de cliente no válido. Comprueba el código que aparece en la ficha que te entregamos.',
  'Código de cliente inválido. Verifique o código na ficha que entregamos a si.',
  'Ungültiger Kundencode. Prüfe den Code auf dem Kundenblatt, das wir dir gegeben haben.',
  'Code client non valide. Vérifiez le code indiqué sur la fiche que nous vous avons remise.'),
'Codice non riconosciuto. Controlla la scheda cliente che ti abbiamo consegnato.': (
  'Code not recognised. Check the customer sheet we gave you.',
  'Código no reconocido. Comprueba la ficha de cliente que te entregamos.',
  'Código não reconhecido. Verifique a ficha de cliente que entregamos a si.',
  'Code nicht erkannt. Prüfe das Kundenblatt, das wir dir gegeben haben.',
  'Code non reconnu. Vérifiez la fiche client que nous vous avons remise.'),
'Codice non valido per questo menu. Lo trovi sulla scheda che ti abbiamo consegnato (3 lettere e 5 numeri).': (
  'Code not valid for this menu. You’ll find it on the sheet we gave you (3 letters and 5 numbers).',
  'Código no válido para este menú. Lo encontrarás en la ficha que te entregamos (3 letras y 5 números).',
  'Código inválido para este menu. Encontra-o na ficha que lhe entregámos (3 letras e 5 números).',
  'Code für diese Speisekarte ungültig. Du findest ihn auf dem Kundenblatt, das wir dir gegeben haben (3 Buchstaben und 5 Ziffern).',
  'Code non valide pour ce menu. Vous le trouverez sur la fiche que nous vous avons remise (3 lettres et 5 chiffres).'),
'Scegli almeno un tipo di richiesta.': ('Choose at least one type of request.', 'Elige al menos un tipo de solicitud.', 'Escolha pelo menos um tipo de pedido.', 'Wähle mindestens eine Art von Anfrage.', 'Choisissez au moins un type de demande.'),
'Tipo di richiesta non valido.': ('Invalid request type.', 'Tipo de solicitud no válido.', 'Tipo de pedido inválido.', 'Ungültige Art von Anfrage.', 'Type de demande non valide.'),
'Le note superano 1000 caratteri.': ('The notes are longer than 1000 characters.', 'Las notas superan los 1000 caracteres.', 'As observações passam de 1000 caracteres.', 'Die Anmerkungen sind länger als 1000 Zeichen.', 'Les notes dépassent 1000 caractères.'),
'Richiesta troppo lunga.': ('Request too long.', 'Solicitud demasiado larga.', 'Pedido longo demais.', 'Anfrage zu lang.', 'Demande trop longue.'),
'Modifiche non valide.': ('Invalid changes.', 'Cambios no válidos.', 'Alterações inválidas.', 'Ungültige Änderungen.', 'Modifications non valides.'),
'Non hai indicato nessuna modifica al menu.': ('You haven’t entered any change to the menu.', 'No has indicado ningún cambio en el menú.', 'Não indicou nenhuma alteração no menu.', 'Du hast keine Änderung an der Speisekarte angegeben.', 'Vous n’avez indiqué aucune modification du menu.'),
'Troppe modifiche in una sola richiesta (massimo 60): dividile in più richieste.': (
  'Too many changes in one request (maximum 60): split them into several requests.',
  'Demasiados cambios en una sola solicitud (máximo 60): divídelos en varias solicitudes.',
  'Alterações demais num só pedido (máximo 60): divida-as em vários pedidos.',
  'Zu viele Änderungen in einer Anfrage (maximal 60): Teile sie auf mehrere Anfragen auf.',
  'Trop de modifications dans une seule demande (maximum 60) : répartissez-les en plusieurs demandes.'),
'Richiesta non trovata o già completata.': ('Request not found or already completed.', 'Solicitud no encontrada o ya completada.', 'Pedido não encontrado ou já concluído.', 'Anfrage nicht gefunden oder bereits erledigt.', 'Demande introuvable ou déjà traitée.'),
'Questa richiesta non è più in attesa: forse è già online o è stata fermata.': (
  'This request is no longer pending: it may already be online or have been stopped.',
  'Esta solicitud ya no está pendiente: quizá ya está en línea o se ha detenido.',
  'Este pedido já não está pendente: talvez já esteja online ou tenha sido interrompido.',
  'Diese Anfrage ist nicht mehr offen: Vielleicht ist sie schon online oder wurde gestoppt.',
  'Cette demande n’est plus en attente : elle est peut-être déjà en ligne ou a été arrêtée.'),
'Questa richiesta non è più in attesa: forse è già online.': (
  'This request is no longer pending: it may already be online.',
  'Esta solicitud ya no está pendiente: quizá ya está en línea.',
  'Este pedido já não está pendente: talvez já esteja online.',
  'Diese Anfrage ist nicht mehr offen: Vielleicht ist sie schon online.',
  'Cette demande n’est plus en attente : elle est peut-être déjà en ligne.'),
'Il menu è in pausa per un intervento tecnico: per riattivarlo scrivi a ': (
  'The menu is paused for technical work: to reactivate it, write to ',
  'El menú está en pausa por una intervención técnica: para reactivarlo escribe a ',
  'O menu está pausado para uma intervenção técnica: para reativá-lo, escreva para ',
  'Die Speisekarte ist wegen eines technischen Eingriffs pausiert: Um sie wieder zu aktivieren, schreib an ',
  'Le menu est en pause pour une intervention technique : pour le réactiver, écrivez à '),
# --- limiti ---------------------------------------------------------------------------------
'Hai già inviato alcune richieste oggi: riprova domani o scrivi a info@dsfabio.com.': (
  'You have already sent some requests today: try again tomorrow or write to info@dsfabio.com.',
  'Ya has enviado algunas solicitudes hoy: vuelve a intentarlo mañana o escribe a info@dsfabio.com.',
  'Já enviou alguns pedidos hoje: tente de novo amanhã ou escreva para info@dsfabio.com.',
  'Du hast heute schon einige Anfragen gesendet: Versuch es morgen wieder oder schreib an info@dsfabio.com.',
  'Vous avez déjà envoyé quelques demandes aujourd’hui : réessayez demain ou écrivez à info@dsfabio.com.'),
"Hai già inviato alcune richieste: riprova tra un'ora o scrivi a info@dsfabio.com.": (
  'You have already sent some requests: try again in an hour or write to info@dsfabio.com.',
  'Ya has enviado algunas solicitudes: vuelve a intentarlo dentro de una hora o escribe a info@dsfabio.com.',
  'Já enviou alguns pedidos: tente de novo daqui a uma hora ou escreva para info@dsfabio.com.',
  'Du hast schon einige Anfragen gesendet: Versuch es in einer Stunde wieder oder schreib an info@dsfabio.com.',
  'Vous avez déjà envoyé quelques demandes : réessayez dans une heure ou écrivez à info@dsfabio.com.'),
'Hai già inviato molte richieste oggi. Riprova domani o contattaci.': (
  'You have already sent many requests today. Try again tomorrow or contact us.',
  'Ya has enviado muchas solicitudes hoy. Vuelve a intentarlo mañana o contáctanos.',
  'Já enviou muitos pedidos hoje. Tente de novo amanhã ou fale connosco.',
  'Du hast heute schon viele Anfragen gesendet. Versuch es morgen wieder oder kontaktiere uns.',
  'Vous avez déjà envoyé beaucoup de demandes aujourd’hui. Réessayez demain ou contactez-nous.'),
"Troppi tentativi non validi. Riprova tra un'ora o contattaci.": (
  'Too many invalid attempts. Try again in an hour or contact us.',
  'Demasiados intentos no válidos. Vuelve a intentarlo dentro de una hora o contáctanos.',
  'Tentativas inválidas demais. Tente de novo daqui a uma hora ou fale connosco.',
  'Zu viele ungültige Versuche. Versuch es in einer Stunde wieder oder kontaktiere uns.',
  'Trop de tentatives non valides. Réessayez dans une heure ou contactez-nous.'),
"Troppi tentativi non validi. Riprova tra un'ora o scrivi a info@dsfabio.com.": (
  'Too many invalid attempts. Try again in an hour or write to info@dsfabio.com.',
  'Demasiados intentos no válidos. Vuelve a intentarlo dentro de una hora o escribe a info@dsfabio.com.',
  'Tentativas inválidas demais. Tente de novo daqui a uma hora ou escreva para info@dsfabio.com.',
  'Zu viele ungültige Versuche. Versuch es in einer Stunde wieder oder schreib an info@dsfabio.com.',
  'Trop de tentatives non valides. Réessayez dans une heure ou écrivez à info@dsfabio.com.'),
"Troppi tentativi. Riprova tra un'ora o scrivi a info@dsfabio.com.": (
  'Too many attempts. Try again in an hour or write to info@dsfabio.com.',
  'Demasiados intentos. Vuelve a intentarlo dentro de una hora o escribe a info@dsfabio.com.',
  'Tentativas demais. Tente de novo daqui a uma hora ou escreva para info@dsfabio.com.',
  'Zu viele Versuche. Versuch es in einer Stunde wieder oder schreib an info@dsfabio.com.',
  'Trop de tentatives. Réessayez dans une heure ou écrivez à info@dsfabio.com.'),
"Il modulo è momentaneamente molto richiesto: riprova tra un po' o scrivi a info@dsfabio.com.": (
  'The form is very busy right now: try again in a while or write to info@dsfabio.com.',
  'El formulario está muy solicitado en este momento: vuelve a intentarlo en un rato o escribe a info@dsfabio.com.',
  'O formulário está muito procurado no momento: tente de novo daqui a pouco ou escreva para info@dsfabio.com.',
  'Das Formular ist gerade sehr gefragt: Versuch es gleich noch einmal oder schreib an info@dsfabio.com.',
  'Le formulaire est très sollicité en ce moment : réessayez dans un moment ou écrivez à info@dsfabio.com.'),
'Il modulo è momentaneamente non disponibile. Riprova più tardi o contattaci.': (
  'The form is temporarily unavailable. Try again later or contact us.',
  'El formulario no está disponible en este momento. Vuelve a intentarlo más tarde o contáctanos.',
  'O formulário está temporariamente indisponível. Tente mais tarde ou fale connosco.',
  'Das Formular ist vorübergehend nicht verfügbar. Versuch es später oder kontaktiere uns.',
  'Le formulaire est momentanément indisponible. Réessayez plus tard ou contactez-nous.'),
'Servizio momentaneamente non disponibile. Riprova più tardi o scrivi a info@dsfabio.com.': (
  'Service temporarily unavailable. Try again later or write to info@dsfabio.com.',
  'Servicio no disponible en este momento. Vuelve a intentarlo más tarde o escribe a info@dsfabio.com.',
  'Serviço temporariamente indisponível. Tente mais tarde ou escreva para info@dsfabio.com.',
  'Dienst vorübergehend nicht verfügbar. Versuch es später oder schreib an info@dsfabio.com.',
  'Service momentanément indisponible. Réessayez plus tard ou écrivez à info@dsfabio.com.'),
# --- modulo Attiva --------------------------------------------------------------------------
'Accetta il trattamento dei dati per inviare.': ('Accept the data processing to send.', 'Acepta el tratamiento de datos para enviar.', 'Aceite o tratamento dos dados para enviar.', 'Stimme der Datenverarbeitung zu, um zu senden.', 'Acceptez le traitement des données pour envoyer.'),
"Per inviare la richiesta accetta l'informativa privacy e le condizioni del servizio.": (
  'To send the request, accept the privacy notice and the terms of service.',
  'Para enviar la solicitud, acepta la política de privacidad y las condiciones del servicio.',
  'Para enviar o pedido, aceite a política de privacidade e os termos do serviço.',
  'Um die Anfrage zu senden, akzeptiere die Datenschutzerklärung und die Nutzungsbedingungen.',
  'Pour envoyer la demande, acceptez la politique de confidentialité et les conditions du service.'),
'Alcuni campi sono troppo lunghi.': ('Some fields are too long.', 'Algunos campos son demasiado largos.', 'Alguns campos são longos demais.', 'Einige Felder sind zu lang.', 'Certains champs sont trop longs.'),
'Controlla i link del sito e dei social.': ('Check the website and social media links.', 'Revisa los enlaces de la web y de las redes sociales.', 'Verifique os links do site e das redes sociais.', 'Prüfe die Links zur Website und zu den sozialen Netzwerken.', 'Vérifiez les liens du site et des réseaux sociaux.'),
'Scrivi il nome del locale.': ('Enter the name of your venue.', 'Escribe el nombre del local.', 'Escreva o nome do estabelecimento.', 'Gib den Namen deines Lokals ein.', 'Indiquez le nom de l’établissement.'),
'Scrivi nome e cognome.': ('Enter your first and last name.', 'Escribe nombre y apellidos.', 'Escreva nome e sobrenome.', 'Gib Vor- und Nachnamen ein.', 'Indiquez votre nom et prénom.'),
"Scrivi l'indirizzo del locale.": ('Enter the venue’s address.', 'Escribe la dirección del local.', 'Escreva o endereço do estabelecimento.', 'Gib die Adresse des Lokals ein.', 'Indiquez l’adresse de l’établissement.'),
'Scrivi la città.': ('Enter the city.', 'Escribe la ciudad.', 'Escreva a cidade.', 'Gib den Ort ein.', 'Indiquez la ville.'),
'Il CAP ha 5 cifre.': ('Check the postcode.', 'Revisa el código postal.', 'Verifique o código postal.', 'Prüfe die Postleitzahl.', 'Vérifiez le code postal.'),
'Scrivi la sigla della provincia (es. FC).': ('Enter the province or region.', 'Escribe la provincia o región.', 'Escreva o estado ou a região.', 'Gib die Provinz oder Region ein.', 'Indiquez la province ou la région.'),
'Controlla il numero di cellulare.': ('Check the mobile number.', 'Revisa el número de móvil.', 'Verifique o número de telemóvel.', 'Prüfe die Handynummer.', 'Vérifiez le numéro de portable.'),
"Controlla l'indirizzo email.": ('Check the email address.', 'Revisa la dirección de email.', 'Verifique o endereço de e-mail.', 'Prüfe die E-Mail-Adresse.', 'Vérifiez l’adresse e-mail.'),
# --- oggetto delle richieste (pagina Blocca) ------------------------------------------------
'Aggiunta piatto': ('New dish', 'Nuevo plato', 'Novo prato', 'Neues Gericht', 'Ajout de plat'),
'Modifica piatto': ('Dish change', 'Cambio de plato', 'Alteração de prato', 'Änderung eines Gerichts', 'Modification de plat'),
'Rimozione piatto': ('Dish removal', 'Eliminación de plato', 'Remoção de prato', 'Entfernen eines Gerichts', 'Retrait de plat'),
'Aggiornamento prezzi': ('Price update', 'Actualización de precios', 'Atualização de preços', 'Preisaktualisierung', 'Mise à jour des prix'),
'Materiale aggiuntivo': ('Additional material', 'Material adicional', 'Material adicional', 'Zusätzliches Material', 'Matériel supplémentaire'),
'modifica del menu': ('menu change', 'cambio en el menú', 'alteração do menu', 'Änderung der Speisekarte', 'modification du menu'),
'📎 Materiale per il menu in preparazione': ('📎 Material for the menu being prepared', '📎 Material para el menú en preparación', '📎 Material para o menu em preparação', '📎 Material für die Speisekarte in Vorbereitung', '📎 Matériel pour le menu en préparation'),
}
# "16/11/2026 alle 10:28" (ora della richiesta)
AT = {'en': 'at', 'es': 'a las', 'pt': 'às', 'de': 'um', 'fr': 'à'}

D = {l: {} for l in LANGS}
for it, tr in M.items():
    assert len(tr) == 5, it
    for l, t in zip(LANGS, tr):
        D[l][it] = t

JS = """/* Messaggi del database nella lingua della pagina. Generato da tools/msg_i18n.py: non modificare a mano. */
(function () {
  var L = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2);
  var D = %s;
  var AT = %s;
  var PAUSE = 'Il menu è in pausa per un intervento tecnico: per riattivarlo scrivi a ';
  function one(m) {
    var d = D[L];
    if (!d || typeof m !== 'string' || !m) return m;
    if (d[m]) return d[m];
    if (m.indexOf(PAUSE) === 0) return d[PAUSE] + m.slice(PAUSE.length);
    var w = m.match(/^(\\d\\d\\/\\d\\d\\/\\d{4}) alle (\\d\\d:\\d\\d)$/);
    if (w) return w[1] + ' ' + AT[L] + ' ' + w[2];
    if (m.indexOf(' + ') > 0) return m.split(' + ').map(function (x) { return d[x] || x; }).join(' + ');
    return m;
  }
  window.dsMsg = one;
  /* traduce i campi di testo di una risposta del database */
  window.dsMsgAll = function (r) {
    if (r && typeof r === 'object' && L !== 'it') ['message', 'subject', 'when'].forEach(function (k) { if (typeof r[k] === 'string') r[k] = one(r[k]); });
    return r;
  };
})();
"""

with open(os.path.join(ROOT, 'assets', 'msg.js'), 'w') as f:
    f.write(JS % (json.dumps(D, ensure_ascii=False, indent=1), json.dumps(AT, ensure_ascii=False)))
print('assets/msg.js: %d messaggi' % len(M))
