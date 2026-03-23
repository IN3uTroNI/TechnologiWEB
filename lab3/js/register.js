function getUsers() {
    return StorageManager.getLocal('users') || [];
}

function saveUsers(users) {
    StorageManager.setLocal('users', users);
}

document.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('message');
    document.getElementById('registerForm').addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!username || !email || !password || !confirmPassword) {
            message.textContent = 'Completati toate câmpurile.';
            message.className = 'alert-error';
            return;
        }
        if (password !== confirmPassword) {
            message.textContent = 'Parolele nu coincid.';
            message.className = 'alert-error';
            return;
        }

        const users = getUsers();
        if (users.some(u => u.username === username)) {
            message.textContent = 'Username deja folosit.';
            message.className = 'alert-error';
            return;
        }
        if (users.some(u => u.email === email)) {
            message.textContent = 'Email deja folosit.';
            message.className = 'alert-error';
            return;
        }

        const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = { id, username, email, password };
        users.push(newUser);
        saveUsers(users);

        message.textContent = 'Înregistrare reușită. Redirecționare la login...';
        message.className = 'alert-success';
        setTimeout(() => location.href = 'login.html', 1200);
    });
});