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
        //Genera un archivo txt si no existe y usa su contenido como nuevo ID
        !existsSync("./src/id/cartID.txt") && writeFileSync("./src/id/cartID.txt", "1", "utf-8");
        const txt = await fs.readFile("./src/id/cartID.txt", 'utf-8');
        let newID = parseInt(txt);

        //Pushea el nuevo cart con el nuevo ID
        const aux2 = { products: [] , id: newID}
        console.log(aux2)
        aux.push(aux2);

        //Actualiza el JSON de productos
        await fs.writeFile(this.path, JSON.stringify(aux));

        //Actualiza el ID del txt para el proximo ID
        await fs.writeFile("./src/id/cartID.txt", JSON.stringify(newID + 1))
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
            const productsDB = await fs.readFile("./src/json/products.json", 'utf-8');
            const auxProducts = JSON.parse(productsDB);
            const product = auxProducts.find(prod => prod.id === idProduct);
            if (product) {
                const productInCart = cart.products.find(prod => prod.product === idProduct);
                if(productInCart) {
                    productInCart.quantity++;
                    await fs.writeFile(this.path, JSON.stringify(auxCart));
                    return `El producto ID: ${idProduct} ha sido añadido al carrito ID: ${idCart} `
                } else {
                    cart.products.push({product: idProduct, quantity: 1});
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