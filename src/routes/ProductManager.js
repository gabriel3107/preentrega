import { Router } from 'express';
import { uploader } from '../utils';

const router = Router();
const products = [];

//Middleware a nivel de router
router.use((req, res, next) => {
    console.log('Time Router: ', Date.now());
    next();
});

//Obtener el listado de mascotas
router.get('/', (req, res) => {
    res.send({ status: 'success', payload: products });
});

router.post('/', (req, res) => {
    
    const product = req.body; 
    if(!product.name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }
    products.push(product);
    res.send({ status: 'success', payload: product });
});

router.post('/v2', uploader.single('thumbnail'), (req, res) => {
    
    const filename = req.file.filename;
    if(!filename) return res.status(500).send({ status: 'error', error: 'no se puede subir el archivo' });
    
    const product = req.body; 
    if(!product.name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }
    product.thumbnail = `http://localhost:8080/public/img/product${filename}`;
    products.push(product);
    res.send({ status: 'success', payload: product });
});

export default router;


// import { promises } from 'fs';

// export default class ProductManager {

//   constructor(ruta) {
//     this.ruta = ruta;
//   }

//   async save(obj) {
    
//   }

//   async getById(id) {
    
//   }

//   async getAll() {
//     try {
//       const products = await promises.readFile(this.ruta, 'utf-8');
//       return JSON.parse(products);
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   }

//   async deleteById(id) {
    
//   }

//   async deleteAll() {
    
//   }
// }