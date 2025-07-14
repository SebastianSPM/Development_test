// Este es el login y se importa
import { login } from '../auth.js';

export function showLogin() {
  setTimeout(() => {
    const form = document.getElementById("login-form");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const success = await login(email, password);
      if (success) {
        window.location.hash = "#/home";
      } else {
        alert("Invalid credentials");
      }
    });
  }, 0);

  return `
    <h1>Login</h1>
    <form id="login-form">
      <input type="email" id="email" placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `;
}
