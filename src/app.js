import express from 'express'
import { __filename, __dirname } from './path.js';
import * as path from 'path'
import routerProduct from './routes/products.routes.js';
import routerCarts from './routes/carts.routes.js';
import multer from 'multer';
import { engine } from 'express-handlebars';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/img');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({storage:storage});

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname,'./views'));

//Routes
app.use('/', express.static(__dirname + './public'));
app.use('/api/products', routerProduct);
app.use('/api/carts', routerCarts);

//Upload Images
app.post('/upload', upload.single('product'), (req,res) => {
    console.log(req.file);
    res.send({response:"Imagen cargada"});
})

//HBS
app.get('/', (req,res) => {
    res.render( "home", {
        mensaje: "Pepe"
    })
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})