const cart = [];
const cartList = document.getElementById('cart');
const totalDisplay = document.getElementById('total');
const producto = document.getElementById('producto');

// Cargar productos
products.forEach(datos => {
    const productDiv = document.createElement('div');
    productDiv.className = 'datos';
    productDiv.setAttribute('data-name', datos.nombre);
    productDiv.setAttribute('data-price', product.precio);

    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button class="add-to-cart">Agregar al Carrito</button>
    `;

    productList.appendChild(productDiv);

    productDiv.querySelector('.add-to-cart').addEventListener('click', () => {
        cart.push(product);
        updateCart();
    });
});

function updateCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCart();
        });
        
        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío. Añade productos antes de procesar la compra.');
    } else {
        alert(`Compra procesada. Total a pagar: $${totalDisplay.textContent.split('$')[1]}`);
        cart.length = 0; // Vaciar el carrito
        updateCart(); // Actualizar la vista del carrito
    }
});
