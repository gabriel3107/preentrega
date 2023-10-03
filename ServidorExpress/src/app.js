import express from 'express';

//Creando el servidor http usando express
const app = express();

const products = [
    { id: 1, title: 'manzana', description: 'fruta', price: 5, thumbnail: '',code: 'prod001', stock: '12'},
    { id: 2, title: 'galleta', description: 'golosina', price: 2, thumbnail: '',code: 'prod002', stock: '10' },
    { id: 3, title: 'arroz', description: 'abarrotes', price: 8, thumbnail: '',code: 'prod003', stock: '20' }
];

app.get('/bienvenida', (req, res) => {
    res.send(`<h1 style="color:blue">Bienvenido a mi primer servidor de express</h1>`)
});


app.get('/productos/:id', (req, res) => {
    const producId = Number(req.params.id);
    const produc = products.find(p => p.id === producId);
    if (!produc) return res.send({ error: 'producto no encontrado' });
    res.send(produc);
});

app.get('/productosquery', (req, res) => {
    const queryParams = req.query;
    res.send(queryParams);
});

app.get('/productos', (req, res) => {
    const producto = req.query.description;
    if(!description||(description!=='fruta'&&description!=='golosina'&&description!=='abarrotes')) return res.send({products});
    const filteredproduc = products.filter(produc=>produc.description===description);
    res.send({productos: filteredproduc});
});

app.listen(8080, () => console.log('Listening on port 8080'));