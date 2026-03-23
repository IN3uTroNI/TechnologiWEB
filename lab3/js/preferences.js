const prefForm = document.getElementById('prefsForm');
const prefMessage = document.getElementById('message');

function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
}

function applyFont(fontSize) {
    const normalized = String(fontSize).trim().replace('px', '');
    document.body.style.fontSize = normalized + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    const username = CookieManager.get('username') || '';
    const theme = CookieManager.get('theme') || 'light';
    const language = localStorage.getItem('language') || 'ro';
    const fontSize = localStorage.getItem('fontSize') || '16';

    document.getElementById('username').value = username;
    document.getElementById('theme').value = theme;
    document.getElementById('language').value = language;
    document.getElementById('fontSize').value = fontSize;

    applyTheme(theme);
    applyFont(fontSize);

    prefForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernameForm = document.getElementById('username').value.trim() || 'Vizitator';
        const themeForm = document.getElementById('theme').value;
        const languageForm = document.getElementById('language').value;
        const fontSizeForm = document.getElementById('fontSize').value;

        CookieManager.set('username', usernameForm);
        CookieManager.set('theme', themeForm);
        localStorage.setItem('language', languageForm);
        localStorage.setItem('fontSize', fontSizeForm);

        applyTheme(themeForm);
        applyFont(fontSizeForm);

        prefMessage.textContent = 'Preferințele au fost salvate cu succes.';
        prefMessage.className = 'alert-success';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
});