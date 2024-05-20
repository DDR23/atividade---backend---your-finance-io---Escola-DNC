//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaGoal = require('../../schemas/schemaGoal');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A META EXISTE
    const goal = await schemaGoal.findByPk(req.params.id);
    if(!goal){
      return res.status(404).json({
        error: 'Goal not found',
        message: `That goal you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
    const { GOAL_NAME, GOAL_AMOUNT, GOAL_DEADLINE } = req.body;

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(GOAL_NAME !== undefined) {
      goal.GOAL_NAME = GOAL_NAME;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(GOAL_AMOUNT !== undefined) {
      goal.GOAL_AMOUNT = GOAL_AMOUNT;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(GOAL_DEADLINE !== undefined) {
      goal.GOAL_DEADLINE = GOAL_DEADLINE;
    }

    //EXECUTA O PUT
    await goal.save();

    //RETORNA O RESULTADO
    return res.status(200).json(goal);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This goal could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;