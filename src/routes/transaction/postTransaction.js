//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaTransaction = require('../../schemas/schemaTransaction');
const schemaUser = require('../../schemas/schemaUser');
const schemaCategory = require('../../schemas/schemaCategory');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { TRANSACTION_AMOUNT, TRANSACTION_DESCRIPTION, TRANSACTION_DATE, FK_USER_ID, FK_CATEGORY_ID } = req.body;

    //VERIFICA SE O USUÁRIO EXISTE
    const user = await schemaUser.findByPk(FK_USER_ID);
    if (!user) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The user does not exist.',
        code: 400
      });
    }

    //VERIFICA SE A CATEGORIA EXISTE
    const category = await schemaCategory.findByPk(FK_CATEGORY_ID);
    if (!category) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The category does not exist.',
        code: 400
      });
    }

    //EXECUTA O POST
    const newTransaction = await schemaTransaction.create({ TRANSACTION_AMOUNT, TRANSACTION_DESCRIPTION, TRANSACTION_DATE, FK_USER_ID, FK_CATEGORY_ID });

    //RETORNA O RESULTADO
    res.status(201).json(newTransaction);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This transaction could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;