import { isAdmin, getSession, clearSession } from '../auth.js';

export function showHome() {
  setTimeout(() => {
    loadEvents();
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      clearSession();
      window.location.hash = '#/';
    });
  }, 0);

  return `
    <h1>Welcome ${getSession()?.email}</h1>
    <button id="logout-btn">Logout</button>
    ${isAdmin() ? '<a href="#/dashboard/events/create">+ Create Event</a>' : ''}
    <div id="event-list"></div>
  `;
}

async function loadEvents() {
  const res = await fetch('http://localhost:3000/events');
  const events = await res.json();
  const user = getSession();
  const container = document.getElementById('event-list');
  container.innerHTML = events.map(ev => {
    const joined = ev.attendees?.includes(user.id);
    const isFull = ev.attendees?.length >= ev.capacity;
    return `
      <div class="event">
        <h3>${ev.title}</h3>
        <p>${ev.description}</p>
        <p>Capacity: ${ev.attendees?.length || 0} / ${ev.capacity}</p>
        ${
          isAdmin()
            ? `<a href="#/dashboard/events/edit/${ev.id}">Edit</a>
               <button onclick="deleteEvent(${ev.id})">Delete</button>`
            : joined
            ? '<p><strong>Registered ✅</strong></p>'
            : !isFull
            ? `<button onclick="joinEvent(${ev.id})">Join</button>`
            : '<p><em>Event full</em></p>'
        }
      </div>`;
  }).join('');
}

window.deleteEvent = async function(id) {
  await fetch('http://localhost:3000/events/' + id, { method: 'DELETE' });
  window.location.reload();
}

window.joinEvent = async function(id) {
  const user = getSession();
  const res = await fetch('http://localhost:3000/events/' + id);
  const event = await res.json();
  if (!event.attendees.includes(user.id)) {
    event.attendees.push(user.id);
    await fetch('http://localhost:3000/events/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
  }
  window.location.reload();
}
