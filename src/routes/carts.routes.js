import { Router } from "express";
import { CartManager } from '../controllers/CartManager.js';
export const routerCarts = Router();
const cartManager = new CartManager("./src/models/carts.json");

// Carts

routerCarts.post('/', async (req, res) => {
    await cartManager.addCart();
    res.send({response: "Carrito creado"});

});

routerCarts.get('/:idCart', async (req, res) => {
    const idCart = parseInt(req.params.idCart);
    if (Number.isInteger(idCart)) {
        let response = await cartManager.getCartByID(idCart);
        res.send({ response: response });
    } else {
        res.send({response:"Error: El ID no es valido"});
    }
});

routerCarts.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = parseInt(req.params.idCart);
    const idProduct = parseInt(req.params.idProduct);
    if (Number.isInteger(idProduct) && Number.isInteger(idCart)) {
        let response = await cartManager.addToCart(idCart, idProduct);
        res.send({response: response});
        
    } else {
        res.send({response:"Error: El ID no es valido"});
    }
});
