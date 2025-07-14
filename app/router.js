// router.js
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showNotFound } from './views/not-found.js';
import { isAuthenticated } from './auth.js';

const routes = {
  '#/': showLogin,
  '#/register': showRegister,
  '#/home': showHome,
};

export function router() {
  const app = document.getElementById('app');
  const hash = window.location.hash || '#/';
  
  // Lo que hace es redirigir si no está autenticado y accede a rutas protegidas
  if (hash === '#/home' && !isAuthenticated()) {
    app.innerHTML = '<h1>Access Denied</h1><p>Please login first.</p>';
    return;
  }
  
  //Comprueba si está autenticado y va a login/register, redirigir a home
  if (isAuthenticated() && (hash === '#/' || hash === '#/register')) {
    window.location.hash = '#/home';
    return;
  }

  const render = routes[hash] || showNotFound;
  app.innerHTML = render();
}
