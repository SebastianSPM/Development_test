const API_URL = 'http://localhost:3010/users';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
  const users = await response.json();

  const messageEl = document.getElementById('login-message');
  if (!users.length) {
    messageEl.textContent = 'Usuario no encontrado.';
    messageEl.style.color = 'red';
    return;
  }

  const user = users[0];
  if (user.password !== password) {
    messageEl.textContent = 'Contraseña incorrecta.';
    messageEl.style.color = 'red';
    return;
  }

  messageEl.textContent = 'Bienvenido, ' + user.email;
  messageEl.style.color = 'green';
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;

  if (!email || !password) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
  const users = await response.json();

  const messageEl = document.getElementById('register-message');
  if (users.length) {
    messageEl.textContent = 'Este correo ya está registrado.';
    messageEl.style.color = 'red';
    return;
  }

  const newUser = { email, password };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (res.ok) {
    messageEl.textContent = 'Registro exitoso. Ahora puede iniciar sesión.';
    messageEl.style.color = 'green';
  } else {
    messageEl.textContent = 'Error al registrar usuario.';
    messageEl.style.color = 'red';
  }
});
