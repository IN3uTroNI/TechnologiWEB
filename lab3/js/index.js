function renderCookies() {
    const data = CookieManager.getAll();
    const tbody = document.querySelector('#cookiesTable tbody');
    tbody.innerHTML = '';
    for (const name in data) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = name;
        const td2 = document.createElement('td');
        td2.textContent = data[name];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }
}

function renderStorage() {
    const local = StorageManager.getAllLocal();
    const session = StorageManager.getAllSession();

    const localBody = document.querySelector('#localTable tbody');
    localBody.innerHTML = '';
    for (const k in local) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${k}</td><td>${JSON.stringify(local[k])}</td>`;
        localBody.appendChild(tr);
    }

    const sessionBody = document.querySelector('#sessionTable tbody');
    sessionBody.innerHTML = '';
    for (const k in session) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${k}</td><td>${JSON.stringify(session[k])}</td>`;
        sessionBody.appendChild(tr);
    }
}

function applyTheme() {
    const theme = CookieManager.get('theme') || 'light';
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
}

function updateVisitInfo() {
    let visits = parseInt(CookieManager.get('visits')) || 0;
    visits += 1;
    CookieManager.set('visits', visits);
    document.getElementById('visits').textContent = `Număr vizite: ${visits}`;
}

function updateWelcome() {
    const user = CookieManager.get('username') || 'Vizitator';
    document.getElementById('welcome').textContent = `Bine ai venit, ${user}!`;
}

document.getElementById('clearAll').addEventListener('click', () => {
    CookieManager.deleteAll();
    StorageManager.clearLocal();
    StorageManager.clearSession();
    renderCookies();
    renderStorage();
    updateWelcome();
    updateVisitInfo();
});

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    updateWelcome();
    updateVisitInfo();
    renderCookies();
    renderStorage();
});