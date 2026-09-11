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
const selected = interests[new URLSearchParams(location.search).get('interes')] || '';
const interest = document.querySelector('#interest');
if (interest && selected) { interest.hidden = false; interest.textContent = 'Tu consulta: ' + selected; }
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
