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
            return "Error: El producto tiene campos incompletos" ;

        } else {
            this.checkFile();
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.code === newProduct.code);

            if (!product) {
                //Genera un archivo txt si no existe y usa su contenido como nuevo ID
                !existsSync("./src/id/productID.txt") && writeFileSync("./src/id/productID.txt", "1", "utf-8");
                const txt = await fs.readFile("./src/id/productID.txt", 'utf-8');
                let newID = parseInt(txt);

                //Pushea el nuevo producto con el nuevo ID
                aux.push({ ...newProduct, id: newID});

                //Actualiza el JSON de productos
                await fs.writeFile(this.path, JSON.stringify(aux));

                //Actualiza el ID del txt para el proximo ID
                await fs.writeFile("./src/id/productID.txt", JSON.stringify(newID + 1))

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