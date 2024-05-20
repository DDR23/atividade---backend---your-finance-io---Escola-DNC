//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaTransaction = require('../../schemas/schemaTransaction');
const schemaCategory = require('../../schemas/schemaCategory');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A TRANSAÇÃO EXISTE
    const transaction = await schemaTransaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        error: 'Transaction not found',
        message: `That transaction you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //TORNA O CAMPO 'TRANSACTION_DESCRIPTION' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newDescription = req.body.TRANSACTION_DESCRIPTION;
    if (newDescription) {
      transaction.TRANSACTION_DESCRIPTION = newDescription;
    }

    //TORNA O CAMPO 'TRANSACTION_AMOUNT' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newAmount = req.body.TRANSACTION_AMOUNT;
    if (newAmount) {
      transaction.TRANSACTION_AMOUNT = newAmount;
    }

    //TORNA O CAMPO 'TRANSACTION_DATE' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newDate = req.body.TRANSACTION_DATE;
    if (newDate) {
      transaction.TRANSACTION_DATE = newDate;
    }

    //TORNA O CAMPO 'FK_CATEGORY_ID' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newCategory = req.body.FK_CATEGORY_ID;
    if (newCategory) {
      //VERIFICA SE A CATEGORIA EXISTE
      const category = await schemaCategory.findByPk( newCategory );
      if (!category) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'The category does not exist.',
          code: 400
        });
      }
      transaction.FK_CATEGORY_ID = newCategory;
    }

    //EXECUTA O PUT
    await transaction.save();

    //RETORNA O RESULTADO
    res.status(200).json(transaction);

    //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This transaction could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;