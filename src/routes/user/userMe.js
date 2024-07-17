//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaUser = require('../../schemas/schemaUser');
const authenticateToken = require('../../middlewares/authenticateToken');

//REQUISIÇÃO HTTP
router.get('/me', authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findByPk(req.user.id, {
      attributes: ['USER_ID','USER_NAME', 'USER_EMAIL', 'USER_DELETED']
    });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: `That user you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //RETORNA O RESULTADO
    return res.status(200).json(user);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to obtain this user due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;
