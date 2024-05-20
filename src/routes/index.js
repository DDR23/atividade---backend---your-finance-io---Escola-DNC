//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();

//REQUISIÇÃO HTTP
router.get('', async (_, res) => {

  //EXECUTA ESSE BLOCO AO BATER NA ROTA
  try {

    //RETORNA AS ROTAS DISPONÍVEIS
    res.status(200).send(`
      <p>Rotas disponíveis:</p>
      <ul>
        <li><a href="/user">user</a></li>
        <li><a href="/goal">goal</a></li>
        <li><a href="/category">category</a></li>
        <li><a href="/transaction">transaction</a></li>
      </ul>
    `);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `Oops! We've hit a snag. Our server is experiencing a momentary hiccup. We'll be back on track shortly!`,
      code: 500
    });
  }
});

module.exports = router;