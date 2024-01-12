const socket = io();

const divSwiper = document.querySelector('#swiper');
const formRTP = document.querySelector('#formRTP');
formRTP.addEventListener('submit', (event) => {
  event.preventDefault();

  const product = {
    title: document.querySelector('#title').value,
    description: '...',
    code: document.querySelector('#code').value,
    price: document.querySelector('#price').value,
    stock: document.querySelector('#stock').value,
    status: true,
    category: document.querySelector('#cat').value,
    thumbnail: document.querySelector('#image').value
  };

  socket.emit('newProduct', product);

  container();
});

function deleteProduct(code) {
  socket.emit('deleteProduct', code);
  container();
}

function container() {
  socket.on('products', (listProduct) => {
    let build = '';
    listProduct.forEach((product) => {
      build += `<div>
        <img src=${product.thumbnail}>
        <p>${product.title}</p>
        <p>Precio: $ ${product.price}</p>
        <p>Código: ${product.code}</p>
        <button onclick="deleteProduct('${product.code}')">Eliminar</button>
      </div>`;
    });
  });
}
