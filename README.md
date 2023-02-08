**Proyecto Programación Backend para CoderHouse**

Comisión: 39685
Alumno: Alexis Paz

Primer Pre-entrega:
Servidor basado en Node.js y express para un e-commerce

Antes de iniciar el servidor primero instalar los modulos de node
Para iniciar el servidor:
 
*scripts*
- npm run start (node)
- npm run dev (nodemon)

Puerto: 8080

Rutas creadas para productos ("/api/products"):

-GET ("/") Muestra todos los productos, y si se ingresa un valor a la key limit "?limit=#" devuelve esa cantidad limitada de productos y si el limite supera la cantidad de productos o es un limite invalido se mostraran todos.

-POST ("/") Guarda un nuevo producto con un id autogenerado.

Ejemplo de producto: 
{
    "title":"Praxis",
    "description":"Anillo de poder",
    "code":"a1",
    "price":500,
    "status": true,
    "stock":30,
    "category":"Anillo",
    "thumbnail": ["./src/public/img/praxis.png"]
}

-PUT ("/:idProduct") Busca y Reemplaza o actualiza el producto con los nuevos campos mandados manteniendo el mismo ID.

-DELETE ("/:idProduct") Busca y Elimina el producto.


Rutas creadas para carritos ("/api/carts"):

-POST ("/") Crea un nuevo carrito con ID autogenerado y un array vacio para productos.

-GET ("/:idCart") Busca y Muestra el array de productos del carrito.

-POST ("/:idCart/product/:idProduct") Busca el carrito y el producto. Si el producto no existe dentro del carrito, crea un objeto dentro del array de productos del carrito con el id del producto y la cantidad = 1, si el producto ya existia en el carrito solo aumenta la cantidad.

