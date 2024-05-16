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
      res.status(404).json({
        error: 'Goal not found',
        message: `That goal you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //TORNA O CAMPO 'GOAL_NAME' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newGoalName = req.body.GOAL_NAME;
    if(newGoalName) {
      goal.GOAL_NAME = newGoalName;
    }

    //TORNA O CAMPO 'GOAL_AMOUNT' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newAmount = req.body.GOAL_AMOUNT;
    if(newAmount) {
      goal.GOAL_AMOUNT = newAmount;
    }

    //TORNA O CAMPO 'GOAL_DEADLINE' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newDeadline = req.body.GOAL_DEADLINE;
    if(newDeadline) {
      goal.GOAL_DEADLINE = newDeadline;
    }

    //EXECUTA O PUT
    await goal.save();

    //RETORNA O RESULTADO
    res.status(200).json(goal);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This goal could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;