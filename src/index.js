//CONFIG. PADRÃO DO EXPRESS
const express = require('express');
const app = express();
app.use(express.json());

//CONFIG. PADRÃO DO CORS
const cors = require('cors');
app.use(cors());


app.listen(8080, () => {
    console.log('Servidor no ar');
});