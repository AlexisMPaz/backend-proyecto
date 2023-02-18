import express from 'express';
import { __filename, __dirname } from './path.js';
import * as path from 'path';

import { routerProduct } from './routes/products.routes.js';
import { routerCarts } from './routes/carts.routes.js';
import { routerIndex } from './routes/index.routes.js';
import { routerUpload } from './routes/upload.routes.js';

import { productManager } from './routes/products.routes.js';

import { engine } from 'express-handlebars';
import { Server } from 'socket.io';


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

//ServerIO
const io = new Server(server);

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    const products = await productManager.getProducts();
    io.emit('updateProducts', products); //Envia los productos para mostrarlos al cargar la página

    socket.on('addProduct', async (newProduct) => {
        const response = await productManager.addProduct(newProduct);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products); //Envia los productos para actualizar las fichas
        io.emit('alert', response); //Envia mensaje para mostrar en un Toastify
    });

    socket.on('deleteProduct', async (id) => {
        const response = await productManager.deleteProduct(parseInt(id));
        const products = await productManager.getProducts();
        io.emit('updateProducts', products); //Envia los productos para actualizar las fichas
        io.emit('alert', response); //Envia mensaje para mostrar en un Toastify
    });
});

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/', routerIndex);
app.use('/upload', routerUpload);
app.use('/api/products', routerProduct);
app.use('/api/carts', routerCarts);

