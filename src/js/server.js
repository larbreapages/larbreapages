import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import fs from 'fs';
import payment from 'bookbuilder/src/js/payment.js';

const app = express();
const PORT = process.env.PORT || 9000;
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(payment);

app.post('/newsletter', (req, res) => {
    const email = req.body.email;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
        fs.appendFile('newsletter.csv', `${req.body.email}\n`);
    }
    return res.send({ status: 'OK' });
});

// serve static stuff
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});
