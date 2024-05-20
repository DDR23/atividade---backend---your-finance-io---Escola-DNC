//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaGoal = require('../../schemas/schemaGoal');
const schemaUser = require('../../schemas/schemaUser');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { GOAL_NAME, GOAL_AMOUNT, GOAL_DEADLINE, FK_USER_ID } = req.body;

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findByPk(FK_USER_ID);
    if (!user) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The user does not exist.',
        code: 400
      });
    }

    //EXECUTA O POST
    const newGoal = await schemaGoal.create({ GOAL_NAME, GOAL_AMOUNT, GOAL_DEADLINE, FK_USER_ID });

    //RETORNA O RESULTADO
    return res.status(201).json(newGoal);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This goal could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;