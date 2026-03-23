function renderCookiesInfo() {
    document.getElementById('rawCookies').textContent = document.cookie;
    const data = CookieManager.getAll();
    const tbody = document.querySelector('#cookiesInfoTable tbody');
    tbody.innerHTML = '';
    for (const name in data) {
        const val = data[name];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${val}</td>
            <td>${val.length}</td>
            <td><button data-name="${name}">Șterge</button></td>`;
        tbody.appendChild(tr);
    }
    tbody.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            CookieManager.delete(btn.dataset.name);
            renderCookiesInfo();
        });
    });
}

function renderStorageInfo() {
    const local = StorageManager.getAllLocal();
    document.getElementById('rawLocal').textContent = JSON.stringify(local, null, 2);
    const tbodyL = document.querySelector('#localInfoTable tbody');
    tbodyL.innerHTML = '';
    for (const k in local) {
        const v = JSON.stringify(local[k]);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${k}</td>
            <td>${v}</td>
            <td>${v.length}</td>
            <td><button data-key="${k}" data-type="local">Șterge</button></td>`;
        tbodyL.appendChild(tr);
    }

    const session = StorageManager.getAllSession();
    document.getElementById('rawSession').textContent = JSON.stringify(session, null, 2);
    const tbodyS = document.querySelector('#sessionInfoTable tbody');
    tbodyS.innerHTML = '';
    for (const k in session) {
        const v = JSON.stringify(session[k]);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${k}</td>
            <td>${v}</td>
            <td>${v.length}</td>
            <td><button data-key="${k}" data-type="session">Șterge</button></td>`;
        tbodyS.appendChild(tr);
    }

    document.querySelectorAll('#localInfoTable button, #sessionInfoTable button').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            if (btn.dataset.type === 'local') StorageManager.removeLocal(key);
            else StorageManager.removeSession(key);
            renderStorageInfo();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCookiesInfo();
    renderStorageInfo();
});