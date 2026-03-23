const defaultUsers = [
    { id: 1, username: 'admin', password: 'password', email: 'admin@example.com' },
    { id: 2, username: 'student', password: 'student123', email: 'student@example.com' }
];

function initUsers() {
    const users = StorageManager.getLocal('users');
    if (!users) {
        StorageManager.setLocal('users', defaultUsers);
    }
}

function getUsers() {
    return StorageManager.getLocal('users') || [];
}

function createSession(user) {
    const session = {
        userId: user.id,
        username: user.username,
        email: user.email,
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substr(2, 12)
    };
    sessionStorage.setItem('session', JSON.stringify(session));
    return session;
}

document.addEventListener('DOMContentLoaded', () => {
    initUsers();
    const message = document.getElementById('message');
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) document.getElementById('username').value = remembered;

    document.getElementById('loginForm').addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        const user = getUsers().find(u => u.username === username && u.password === password);
        if (!user) {
            message.textContent = 'Username sau parolă incorecte.';
            message.className = 'alert-error';
            return;
        }

        if (remember) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }

        createSession(user);

        message.textContent = 'Autentificare reușită. Redirecționare...';
        message.className = 'alert-success';
        setTimeout(() => location.href = 'dashboard.html', 800);
    });
});