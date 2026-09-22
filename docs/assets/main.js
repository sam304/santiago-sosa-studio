'use strict';
document.body.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (toggle && navigation) {
  toggle.hidden = false;
  const closeMenu = () => { navigation.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
const interests = {
  rotulacion: 'Rotulación y publicidad gráfica', senalizacion: 'Señalización e identificación',
  acrilico: 'Acrílico y fabricación personalizada', diseno: 'Diseño gráfico aplicado',
  'numero-habitacion': 'Números de habitación', 'exhibidor-acrilico': 'Exhibidores en acrílico',
  'placa-personalizada': 'Placas personalizadas', exhibidor: 'Exhibidor para punto de atención'
};
const params = new URLSearchParams(location.search);
const ownInterest = key => Object.prototype.hasOwnProperty.call(interests, key) ? interests[key] : '';
const selected = ownInterest(params.get('producto')) || ownInterest(params.get('interes'));
const origins = { proyectos: 'Proyectos', taller: 'El taller' };
const originKey = params.get('origen');
const origin = Object.prototype.hasOwnProperty.call(origins, originKey) ? origins[originKey] : '';
const interest = document.querySelector('#interest');
if (interest && (selected || origin)) {
  interest.hidden = false;
  interest.textContent = selected ? 'Tu consulta: ' + selected : 'Vienes de: ' + origin;
}
const config = window.STUDIO_CONFIG || {};
const message = 'Hola, Santiago Sosa Studio. Quisiera solicitar una cotización' + (selected ? ' para: ' + selected : ' para mi proyecto') + '.';
let available = false;
const wa = document.querySelector('#whatsapp');
if (wa && /^\d{10,15}$/.test(config.whatsapp || '')) {
  wa.href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(message);
  wa.hidden = false; available = true;
}
const email = document.querySelector('#email');
if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '')) {
  email.href = 'mailto:' + config.email + '?subject=' + encodeURIComponent('Cotización — ' + (selected || 'Nuevo proyecto')) + '&body=' + encodeURIComponent(message);
  email.hidden = false; available = true;
}
const pending = document.querySelector('#contact-pending');
if (pending) pending.hidden = available;

// Static quote preparation: no upload, storage or submission to a server.
// A future receiving service must validate inputs and attachments on its server.
const form = document.querySelector('#quote-form');
if (form) {
  const fields = document.querySelector('#quote-fields');
  const need = document.querySelector('#quote-need');
  const review = document.querySelector('#quote-review');
  const summary = document.querySelector('#quote-summary');
  const send = document.querySelector('#quote-send');
  const name = document.querySelector('#quote-name');
  const phone = document.querySelector('#quote-phone');
  const hasWhatsApp = /^\d{10,15}$/.test(config.whatsapp || '');
  fields.disabled = !hasWhatsApp;
  if (selected) need.value = selected;
  if (!hasWhatsApp) {
    document.querySelector('#quote-help').textContent = 'La preparación de consultas estará disponible cuando se habilite el contacto por WhatsApp.';
  }
  const validate = () => {
    [name, phone, need].forEach(field => field.setCustomValidity(
      field.value.trim() ? '' : 'Completa este campo para preparar tu consulta.'
    ));
  };
  form.addEventListener('input', () => {
    validate();
    review.hidden = true;
    send.removeAttribute('href');
  });
  form.addEventListener('change', () => { review.hidden = true; send.removeAttribute('href'); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    validate();
    if (!form.reportValidity() || !hasWhatsApp) return;
    const data = new FormData(form);
    const labels = {
      nombre: 'Nombre', contacto: 'WhatsApp / teléfono', necesidad: 'Qué necesito',
      cantidad: 'Cantidad aproximada', medidas: 'Medidas aproximadas',
      fecha: 'Fecha deseada', instalacion: 'Instalación'
    };
    const lines = ['Hola, Santiago Sosa Studio. Quisiera solicitar una cotización.'];
    for (const [key, label] of Object.entries(labels)) {
      const value = String(data.get(key) || '').trim();
      if (value) lines.push(label + ': ' + value);
    }
    if (origin) lines.push('Origen de la consulta: ' + origin);
    const text = lines.join('\n');
    summary.textContent = text;
    send.href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(text);
    review.hidden = false;
    document.querySelector('#review-title').focus();
  });
}
