//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaUser = require('../../schemas/schemaUser');

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findByPk(req.params.id);
    if(!user){
      return res.status(404).json({
        error: 'User not found',
        message: `That user you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //ESSE RESPONSÁVEL POR EDITAR O 'USER_EMAIL'
    //TORNA O CAMPO 'USER_EMAIL' OPCIONAL E VERIFICA SE ALGUM VALOR FOI PASSADO
    const newUserEmail = req.body.USER_EMAIL;
    if(newUserEmail) {
      //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
      const emailNotUnique = await schemaUser.findOne({ where: { USER_EMAIL: newUserEmail } });
      if(emailNotUnique){
        return res.status(409).json({
          error: 'This email already exists',
          message: 'There is already a user with that email in the database.',
          code: 409
        });
      }
      //SALVA O NOVO VALOR
      user.USER_EMAIL = newUserEmail;
    }

    //TORNA O CAMPO 'USER_NAME' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newUserName = req.body.USER_NAME;
    if(newUserName) {
      user.USER_NAME = newUserName;
    }

    //TORNA O CAMPO 'USER_PASSWORD' OPCIONAL E EXECUTA CASO ALGUM VALOR SEJA RECEBIDO
    const newPassword = req.body.USER_PASSWORD;
    if(newPassword) {
      user.USER_PASSWORD = newPassword;
    }

    //EXECUTA O PUT
    await user.save();

    //RETORNA O RESULTADO
    res.status(200).json(user);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This user could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;