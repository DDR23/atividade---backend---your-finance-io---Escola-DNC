//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaGoal = require('../../schemas/schemaGoal');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A META EXISTE
    const goal = await schemaGoal.findByPk(req.params.id);
    if (!goal) {
      return res.status(404).json({
        error: 'Goal not found',
        message: `That goal you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //EXECUTA O DELETE
    await goal.destroy();

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'Goal deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This goal could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;