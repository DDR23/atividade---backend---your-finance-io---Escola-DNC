//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaGoal = require('../../schemas/schemaGoal');

//REQUISIÇÃO HTTP
router.get('/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A META EXISTE
    const goal = await schemaGoal.findByPk(req.params.id);
    if(!goal){
      return res.status(404).json({
        error: 'Goal not found',
        messege: `That goal you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //RETORNA O RESULTADO
    res.status(200).json(goal);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this goal due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router; 