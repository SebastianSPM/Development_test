//const app = document.getElementById('app');

//Esta es la estructura de una SPA (Single Page Application) en JavaScript
//donde se manejan las rutas y el contenido dinámico sin recargar la página.
function getLoginPage() { 
    return `<h1>Login Page</h1>
  <form id="login-form">
    <input type="email" id="email" placeholder="Correo electrónico" required>
    <input type="password" id="password" placeholder="Contraseña" required>
    <button type="submit">Entrar</button>
  </form>
  <div id="login-message"></div> ${document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    console.log(email);
    console.log(password);
  })}`;
}

//app.innerHTML += getLoginPage;


function getHomePage() { 
    return`<h1>Welcome Home</h1><p>This is our SPA home page.</p>`;
}

//app.innerHTML += getHomePage;


function getRegistrePage() { 
    return`
    <h1>Registrarse</h1>
  <form id="register-form">
    <input type="email" id="reg-email" placeholder="Correo electrónico" required>
    <input type="password" id="reg-password" placeholder="Contraseña" required>
    <button type="submit">Registrar</button>
  </form>
  <div id="register-message"></div>
`;
}

//app.innerHTML += getRegistrePage;


// Definición de rutas y sus correspondientes funciones
// Aquí se definen las rutas de la aplicación y las funciones que se ejecutarán al acceder a cada ruta.
// Cada ruta corresponde a una función que retorna el contenido HTML para esa ruta.
// Esto permite que la aplicación sea dinámica y cambie el contenido sin recargar la página.
// Las rutas se definen en un objeto donde la clave es el hash de la URL y el valor es la función que retorna el contenido HTML.
const routes = {
    '#/': getLoginPage,
    '#/home': getHomePage,
    '#/registre': getRegistrePage
};


// Esta función maneja el cambio de ruta y actualiza el contenido del elemento con id 'app'.
// Se utiliza el evento 'hashchange' para detectar cambios en la URL y actualizar el contenido de la aplicación.
// Si la ruta no está definida, se muestra un mensaje de "Página no encontrada".    
function handleRoute() {
    const hash = window.location.hash || '#/';
    const content = routes[hash] ? routes[hash]() : '<h1>Page Not Found</h1>';
    const app = document.getElementById('app').innerHTML = content;
}


// Se añaden los eventos de cambio de hash y carga de la ventana para manejar las rutas.
// Estos eventos permiten que la aplicación responda a los cambios en la URL y cargue el contenido correspondiente.
// Al cargar la página, se llama a handleRoute para mostrar el contenido inicial.
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

const state = {
    users: [],
    currentPage: 'home',
    isLoading: false
};

// Esta función actualiza el estado de la aplicación y vuelve a renderizar el contenido.
function updateState(newState) {
    Object.assign(state, newState);
    renderContent();
}

// Esta función renderiza el contenido de la aplicación basado en el estado actual.
function renderContent() {
    const appDiv = document.getElementById('app');
    if (state.isLoading) {
        appDiv.innerHTML = '<div>Loading...</div>';
        return;
    }
    appDiv.innerHTML = routes[window.location.hash || '#/']();
}

//linea
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderContent();
});

function setupEventListeners() {
    document.getElementById('app').addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.matches('.button-submit')) {
            handleSubmit(event);
        }
        if (event.target.matches('.toggle-menu')) {
            toggleMenu(event);
        }
    });
}

// Esta función maneja el envío de formularios y actualiza el estado de la aplicación.
// Se previene el comportamiento por defecto del formulario para evitar recargas de página.
// Se actualiza el estado de la aplicación para indicar que se está cargando y se puede mostrar un mensaje de carga.
function handleSubmit(event) {
    event.preventDefault();
    updateState({ isLoading: true });
}

function toggleMenu(event) {
    document.querySelector('.menu').classList.toggle('active');
}

const socket = new WebSocket('ws://your-server-url');

socket.addEventListener('message', function(event) {
    const data = JSON.parse(event.data);
    updateState({ users: data.users, isLoading: false });
});

function sendMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}
//Auth.js



