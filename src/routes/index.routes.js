import { Router } from "express";
import { productManager } from "../routes/products.routes.js";

export const routerIndex = Router()

//HBS
routerIndex.get('/', async (req,res) => {
    const products = await productManager.getProducts()

    res.render( "index", {
        products
    });
});

routerIndex.get('/realTimeProducts', async (req,res) => {
    res.render( "realTimeProducts", {});
});