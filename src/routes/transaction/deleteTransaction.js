//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaTransaction = require('../../schemas/schemaTransaction');
const authenticateToken = require('../../middlewares/authenticateToken');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', authenticateToken, async (req, res) => {

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

    //EXECUTA O DELETE
    await transaction.destroy();

    //RETORNA O RESULTADO
    return res.status(200).json({
      message: 'Transaction deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This transaction could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;
