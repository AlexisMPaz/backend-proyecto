import { promises as fs, existsSync, writeFileSync } from 'fs'

// Clases para Manager y Producto
export class ProductManager {
    constructor(path) {
        this.path = path
    }

    checkFile = () => {
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async addProduct(newProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null) || Object.values(newProduct).includes(undefined)) {
            return "Error: El producto tiene campos incompletos";

        } else {
            this.checkFile();
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.code === newProduct.code);

            if (!product) {
                //Pushea el nuevo producto con el nuevo ID
                const newID = aux.length ? aux[aux.length - 1].id + 1 : 1;
                aux.push({ ...newProduct, id: newID});

                //Actualiza el JSON de productos
                await fs.writeFile(this.path, JSON.stringify(aux));

                return "Success: El producto ha sido creado"
            } else {
                return "Error: El producto ya existe";
            }
        }
    }

    async getProducts() {
        this.checkFile();
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        return aux;
    }


    async getProductByID(idProduct) {
        this.checkFile();
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if (product) {
            return product;
        } else {
            return `Error: El Producto ID: ${idProduct} no existe`;
        }
    }

    async updateProduct(newProduct, idProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            return "Error: El producto tiene campos incompletos";

        } else {
            this.checkFile()
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.id === idProduct);
            if(product) {
                const indice = aux.findIndex(prod => prod.id === idProduct);
                aux[indice] = {...newProduct, id:idProduct};
                await fs.writeFile(this.path, JSON.stringify(aux));
                return `Success: El Producto ID: ${idProduct} ha sido actualizado`
            } else {
                return `Error: El Producto ID: ${idProduct} no existe`;
            }
        }
    }

    async deleteProduct(idProduct) {
        this.checkFile();
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if(product) {
            const newArray = aux.filter(prod => prod.id !== idProduct)
            await fs.writeFile(this.path, JSON.stringify(newArray));
            return `Success: El Producto ${idProduct} ha sido eliminado`
        } else {
            return `Error: El Producto ${idProduct} no existe`;
        }
    }
}

export class Product {
    constructor(title, description, code, price, status, stock, category, thumbnail) {
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }
}
