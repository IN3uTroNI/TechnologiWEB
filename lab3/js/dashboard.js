function getSession() {
    const raw = sessionStorage.getItem('session');
    return raw ? JSON.parse(raw) : null;
}

function formatDuration(startISO) {
    const start = new Date(startISO);
    const diffMs = Date.now() - start.getTime();
    const sec = Math.floor(diffMs / 1000 % 60);
    const min = Math.floor(diffMs / 60000 % 60);
    const hour = Math.floor(diffMs / 3600000);
    return `${hour}h ${min}m ${sec}s`;
}

document.addEventListener('DOMContentLoaded', () => {
    const session = getSession();
    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    const info = document.getElementById('sessionInfo');
    const durationElem = document.createElement('p');
    info.innerHTML = `
        <p>ID sesiune: <strong>${session.sessionId}</strong></p>
        <p>Username: <strong>${session.username}</strong></p>
        <p>Email: <strong>${session.email}</strong></p>
        <p>Ora autentificării: <strong>${new Date(session.loginTime).toLocaleString()}</strong></p>
    `;
    info.appendChild(durationElem);

    function updateDuration() {
        durationElem.textContent = 'Durata sesiunii: ' + formatDuration(session.loginTime);
    }
    updateDuration();
    setInterval(updateDuration, 1000);

    document.getElementById('rawSession').textContent = JSON.stringify(sessionStorage, null, 2);

    document.getElementById('logoutLink').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('session');
        window.location.href = 'login.html';
    });
});