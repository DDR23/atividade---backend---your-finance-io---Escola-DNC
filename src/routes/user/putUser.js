//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const schemaUser = require('../../schemas/schemaUser');
const authenticateToken = require('../../middlewares/authenticateToken');

//REQUISIÇÃO HTTP
router.put('/edit', authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findByPk(req.user.id);
    if(!user){
      return res.status(404).json({
        error: 'User not found',
        message: `That user you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
    const { USER_NAME, USER_PASSWORD, USER_DELETED } = req.body;

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(USER_NAME !== undefined) {
      user.USER_NAME = USER_NAME;
    }
    
    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(USER_PASSWORD !== undefined) {
      const hashedPassword = await argon2.hash(USER_PASSWORD);
      user.USER_PASSWORD = hashedPassword;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(USER_DELETED === true) {
      return res.status(400).json({
        error: 'Invalid operation',
        message: 'Use the DELETE method to mark a user as deleted.',
        code: 400
      })
    }
    if(USER_DELETED === false) {
      user.USER_DELETED = USER_DELETED
    }

    //EXECUTA O PUT
    await user.save();

    //RETORNA O RESULTADO
    return res.status(200).json(user);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This user could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;
