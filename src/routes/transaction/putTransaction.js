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

    //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
    const { TRANSACTION_DESCRIPTION, TRANSACTION_AMOUNT, TRANSACTION_DATE, FK_CATEGORY_ID } = req.body;

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if (TRANSACTION_DESCRIPTION !== undefined) {
      transaction.TRANSACTION_DESCRIPTION = TRANSACTION_DESCRIPTION;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if (TRANSACTION_AMOUNT !== undefined) {
      transaction.TRANSACTION_AMOUNT = TRANSACTION_AMOUNT;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if (TRANSACTION_DATE !== undefined) {
      transaction.TRANSACTION_DATE = TRANSACTION_DATE;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if (FK_CATEGORY_ID !== undefined) {
      //VERIFICA SE O VALOR PASSADO EXISTE NO BANCO E RETORNA ERRO
      const category = await schemaCategory.findByPk( FK_CATEGORY_ID );
      if (!category) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'The category does not exist.',
          code: 400
        });
      }
      //SALVA O NOVO VALOR
      transaction.FK_CATEGORY_ID = FK_CATEGORY_ID;
    }

    //EXECUTA O PUT
    await transaction.save();

    //RETORNA O RESULTADO
    return res.status(200).json(transaction);

    //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This transaction could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;