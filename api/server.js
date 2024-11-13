const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const porta = 3000;

//app.use(bodyParser.json());
//app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const rotas = require('./rotas');
app.use('/api', rotas);

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
