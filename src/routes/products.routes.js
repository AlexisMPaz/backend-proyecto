import { Router } from "express";
import { ProductManager, Product } from "../controllers/ProductManager.js";

export const routerProduct = Router();
export const productManager = new ProductManager("./src/models/products.json");

//Products

routerProduct.get('/', async (req, res) => {
    const data = await productManager.getProducts();
    let { limit } = req.query;
    if (limit && Number.isInteger(parseInt(limit))) {
        const products = data.slice(0, limit);
        res.send({ response: products });
    } else {
        res.send({ response: data });
    }
});


routerProduct.get('/:idProduct', async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    if (Number.isInteger(idProduct)) {
        let response = await productManager.getProductByID(idProduct);
        res.send({ response: response });
    } else {
        res.send({response:"Error: El ID no es valido"});
    }
});

routerProduct.post('/', async (req, res) => {
    let { title, description, code, price, stock, category, thumbnails, status } = req.body;
    const newProduct = new Product(title, description, code, price, stock, category, thumbnails, status);
    console.log(newProduct);
    let response = await productManager.addProduct(newProduct);
    res.send({ response: response });
});

routerProduct.put('/:idProduct', async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    if (Number.isInteger(idProduct)) {
        let { title, description, code, price, stock, category, thumbnails, status } = req.body;
        const newProduct = new Product(title, description, code, price, stock, category, thumbnails, status);
        let response = await productManager.updateProduct(newProduct, idProduct);
        res.send({ response: response });
    } else {
        res.send({response:"Error: El ID no es valido"});
    }

});

routerProduct.delete('/:idProduct', async (req, res) => {
    const idProduct = parseInt(req.params.idProduct);
    if (Number.isInteger(idProduct)) {
        let response = await productManager.deleteProduct(idProduct);
        res.send({ response: response });
    } else {
        res.send({response:"Error: El ID no es valido"});
    }
});