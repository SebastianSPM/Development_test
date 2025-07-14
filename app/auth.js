
const API_URL = "http://localhost:3000/users";

// Aqui se guarda usuario en LocalStorage
export function saveSession(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

//Se obtener usuario actual
export function getSession() {
  return JSON.parse(localStorage.getItem("user"));
}

// Esta parte eliminar sesión
export function clearSession() {
  localStorage.removeItem("user");
}

// Verifica si hay sesión activa
export function isAuthenticated() {
  return !!getSession();
}

// Verifica si el usuario es admin
export function isAdmin() {
  const user = getSession();
  return user && user.role === "admin";
}

// Login del usuario
export async function login(email, password) {
  const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
  const data = await res.json();
  if (data.length > 0) {
    saveSession(data[0]);
    return true;
  }
  return false;
}

// El registro de un nuevo usuario
export async function register(email, password) {
  const res = await fetch(`${API_URL}?email=${email}`);
  const data = await res.json();
  if (data.length > 0) return false;

  const newUser = { email, password, role: "visitor" };
  const post = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  return post.ok;
}
