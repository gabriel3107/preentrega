import  express  from "express";
import ProductRouter from "./routes/ProductManager.router.js";
import carsRouter from "./routes/cars.router.js"
import { __dirname } from './utils.js';


const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

function middlewareNivelServicio(req, res, next) {
    req.dato1 = 'agregado a nivel del middleware'
    next();
}

console.log(__dirname);


app.use('/api/product', ProductRouter);
app.use('/api/cars', carsRouter);

app.get('/test', middlewareNivelServicio, (req, res) => {
    console.log(variableNoExiste);
    res.send({ payload: {
        dato: req.dato1
    } })
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ error: err.message });
});

app.listen(8080, () => console.log('Server running'));