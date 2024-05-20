//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaGoal = require('../../schemas/schemaGoal');

//REQUISIÇÃO HTTP
router.get('/', async (_, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE INVENTARIO
    const goal = await schemaGoal.findAll();

    //RETORNA O RESULTADO
    res.status(200).json(goal);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: `The goal list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

module.exports = router;