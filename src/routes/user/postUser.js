//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaUser = require('../../schemas/schemaUser');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { USER_EMAIL, USER_NAME, USER_PASSWORD } = req.body;

    //VERIFICA SE JÁ EXISTE ALGUM USUARIO COM O EMAIL PASSADO NO 'USER_EMAIL'
    const emailNotUnique = await schemaUser.findOne({ where: { USER_EMAIL } });
    if (emailNotUnique) {
      return res.status(409).json({
        error: 'This email already exists',
        message: 'There is already a user with that email in the database.',
        code: 409
      });
    }

    //EXECUTA O POST
    const newUser = await schemaUser.create({ USER_EMAIL, USER_NAME, USER_PASSWORD });

    //RETORNA O RESULTADO
    return res.status(201).json(newUser);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This user could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;