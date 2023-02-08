import { promises as fs, existsSync, writeFileSync } from 'fs'

export class CartManager {
    constructor(path) {
        this.path = path
    }

    checkFile = () => {
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async addCart() {
        this.checkFile();
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);

        //Pushea el nuevo cart con el nuevo ID
        const newID = aux.length ? aux[aux.length - 1].id + 1 : 1;
        const newCart = { products: [] , id: newID};
        aux.push(newCart);

        //Actualiza el JSON de productos
        await fs.writeFile(this.path, JSON.stringify(aux));
    }

    async getCartByID(idCart) {
        this.checkFile();
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const cart = aux.find(cart => cart.id === idCart);
        if (cart) {
            return cart.products;
        } else {
            return `Error: El Carrito ID: ${idCart} no existe`;
        }
    }

    async addToCart(idCart, idProduct) {
        this.checkFile();
        const cartDB = await fs.readFile(this.path, 'utf-8');
        const auxCart = JSON.parse(cartDB);
        const cart = auxCart.find(cart => cart.id === idCart);
        if (cart) {
            const productsDB = await fs.readFile("./src/models/products.json", 'utf-8');
            const auxProducts = JSON.parse(productsDB);
            const product = auxProducts.find(prod => prod.id === idProduct);
            if (product) {
                const productInCart = cart.products.find(prod => prod.product === idProduct);
                if(productInCart) {
                    productInCart.quantity++;
                    await fs.writeFile(this.path, JSON.stringify(auxCart));
                    return `El producto ID: ${idProduct} ha sido añadido al carrito ID: ${idCart} `
                } else {
                    cart.products.push({idProduct: idProduct, quantity: 1});
                    await fs.writeFile(this.path, JSON.stringify(auxCart));
                    return `El producto ID: ${idProduct} ha sido añadido al carrito ID: ${idCart} `
                }
                
            } else {
                return `Error: El producto ID: ${idProduct} no existe`
            }
        
        } else {
            return `Error: El Carrito ID: ${idCart} no existe`;
        }

    }
}