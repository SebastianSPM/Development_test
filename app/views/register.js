// Se hace el registro
import { register } from '../auth.js';

export function showRegister() {
  setTimeout(() => {
    const form = document.getElementById("register-form");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;
      const success = await register(email, password);
      if (success) {
        alert("Registered! Now you can login.");
        window.location.hash = "#/";
      } else {
        alert("Email already exists.");
      }
    });
  }, 0);

  return `
    <h1>Register</h1>
    <form id="register-form">
      <input type="email" id="reg-email" placeholder="Email" required>
      <input type="password" id="reg-password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `;
}
