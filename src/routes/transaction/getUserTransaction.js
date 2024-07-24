//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaTransaction = require('../../schemas/schemaTransaction');
const authenticateToken = require('../../middlewares/authenticateToken');

//REQUISIÇÃO HTTP
router.get('/user/:userId', authenticateToken, async (req, res) => {
  //TODO retirar :id da rota e pegar via token

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //PEGA O ID DO USUARIO
    const { userId } = req.params;

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE TRANSAÇÕES
    const transaction = await schemaTransaction.findAll({ where: { FK_USER_ID: userId } });

    //RETORNA O RESULTADO
    return res.status(200).json(transaction);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: `The transaction list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

module.exports = router;