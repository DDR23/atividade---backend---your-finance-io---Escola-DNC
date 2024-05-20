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

    //PEGA TODOS OS VALORES PARA QUE SEJAM ALTERADOS
    const { USER_EMAIL, USER_NAME, USER_PASSWORD } = req.body;

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(USER_EMAIL !== undefined) {
      //VERIFICA SE O VALOR PASSADO JA EXISTE NO BANCO E RETORNA ERRO
      const emailNotUnique = await schemaUser.findOne({ where: { USER_EMAIL: USER_EMAIL } });
      if(emailNotUnique){
        return res.status(409).json({
          error: 'This email already exists',
          message: 'There is already a user with that email in the database.',
          code: 409
        });
      }
      //SALVA O NOVO VALOR
      user.USER_EMAIL = USER_EMAIL;
    }

    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(USER_NAME !== undefined) {
      user.USER_NAME = USER_NAME;
    }
    
    //VERIFICA SE ALGUM VALOR FOI PASSADO
    if(USER_PASSWORD !== undefined) {
      user.USER_PASSWORD = USER_PASSWORD;
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