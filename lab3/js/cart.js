const products = {
    laptop: { name: 'Laptop', price: 2500 },
    telefon: { name: 'Telefon', price: 1200 },
    tableta: { name: 'Tabletă', price: 800 },
    casti: { name: 'Căști', price: 150 }
};

function checkAuth() {
    const session = sessionStorage.getItem('session');
    if (!session) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function getCart() {
    const raw = sessionStorage.getItem('cart');
    return raw ? JSON.parse(raw) : {};
}

function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
    let total = 0;

    Object.keys(cart).forEach(key => {
        const product = products[key];
        const qty = cart[key];
        if (!product || qty === 0) return;
        const row = document.createElement('tr');
        const price = product.price * qty;
        total += price;
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${qty}</td>
            <td>${price}</td>
            <td><button class="btn-danger" data-key="${key}">Șterge</button></td>
        `;
        tbody.appendChild(row);
    });
    document.getElementById('total').textContent = total;

    tbody.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            const cart = getCart();
            delete cart[key];
            saveCart(cart);
            renderCart();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;
    const select = document.getElementById('product');
    Object.keys(products).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = `${products[key].name} - ${products[key].price} lei`;
        select.appendChild(opt);
    });

    renderCart();

    document.getElementById('cartForm').addEventListener('submit', e => {
        e.preventDefault();
        const key = document.getElementById('product').value;
        const quantity = Number(document.getElementById('quantity').value);
        if (quantity < 1 || quantity > 10) return;

        const cart = getCart();
        cart[key] = (cart[key] || 0) + quantity;
        saveCart(cart);
        renderCart();
    });

    document.getElementById('clearCart').addEventListener('click', () => {
        saveCart({});
        renderCart();
    });
});