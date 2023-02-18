if (window.location.pathname === '/realTimeProducts') { //Este condicional sirve para que el socket solo se conecte cuando el usuario ingresa a la url /realTimeProducts
    const socket = io();

    const formAddProduct = document.getElementById("formAddProduct");
    const productsContainer = document.getElementById("productsContainer");

    function deleteProduct(productID) {
        socket.emit("deleteProduct", productID);
    }

    formAddProduct.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(formAddProduct);
        const newProduct = {};
        formData.forEach((value, key) => {

            if (key === 'price' || key === 'stock') {
                value = parseFloat(value); //Convierte los valores de precio y stock a number
            }

            // Agregar la propiedad al nuevo producto
            newProduct[key] = value;
        });

        newProduct['status'] = true; //Establecer el Estado del producto

        socket.emit("addProduct", newProduct);
        formAddProduct.reset()
    })

    socket.on("updateProducts", (products) => {
        productsContainer.innerHTML = "";
        products.forEach(product => {
            productsContainer.innerHTML +=
                `<div class="col-12 col-md-6">
                <div class="card border-light mb-3 container artifactCard">
                    <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                            <img src="${product.thumbnails}" class="img-fluid" alt="...">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h4 class="card-title itemName">${product.title}</h4>
                                <p class="card-text itemType">Categoria: ${product.category}</p>
                                <p class="card-text">Codigo: ${product.code}</p>
                                <p class="card-text">Descripcion: ${product.description}</p>
                                <p class="card-text">Stock: ${product.stock}</p>
                                <p class="card-text">Precio: ${product.price} X <img src="/img/coin.png" alt="Monedas" /></p>
                                <p class="card-text">Status: ${product.status}</p>
                                <p class="card-text">ID: ${product.id}</p>
                                <button class="btn btn-warning" onClick="deleteProduct(${product.id})"> Borrar Producto </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        })
    })

    socket.on("alert", (response) => {
        Toastify({
            text: response,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to left, rgba(43, 51, 68, 1), rgba(20, 31, 49, 1))",
            }
        }).showToast();

    })
} 