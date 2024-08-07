// Datos de ejemplo para productos
const productos = [
    { id: 1, nombre: 'Pala padel', precio: 10.00, descripcion: 'Descripción del Producto 1', imagen: 'img1.jpg' },
    { id: 2, nombre: 'Pelotas padel', precio: 20.00, descripcion: 'Descripción del Producto 2', imagen: 'img2.jpg' },
    { id: 3, nombre: 'Producto 3', precio: 30.00, descripcion: 'Descripción del Producto 3', imagen: 'img3.jpg' }
];

// Inicialización del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar productos
function renderizarProductos() {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = ''; // Limpiar contenido previo
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.precio.toFixed(2)}</strong></p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    renderizarCarrito();
}

// Función para guardar el carrito en LocalStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para renderizar el carrito
function renderizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)} x ${producto.cantidad}
            <button onclick="mostrarEliminar(${producto.id})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });
    actualizarTotal();
}

// Función para mostrar el prompt y eliminar la cantidad especificada
function mostrarEliminar(idProducto) {
    const cantidadAEliminar = parseInt(prompt('¿Cuántas unidades desea eliminar?'), 10);
    if (!isNaN(cantidadAEliminar) && cantidadAEliminar > 0) {
        eliminarDelCarrito(idProducto, cantidadAEliminar);
    } else {
        alert('Por favor ingrese una cantidad válida.');
    }
}

// Función para eliminar una cantidad específica de un producto del carrito
function eliminarDelCarrito(idProducto, cantidad) {
    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad -= cantidad;
        if (productoEnCarrito.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== idProducto);
        }
        guardarCarrito();
        renderizarCarrito();
    }
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    const totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.getElementById('totalPrecio').textContent = totalPrecio.toFixed(2);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    renderizarCarrito();
});
