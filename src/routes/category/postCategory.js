//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaCategory = require('../../schemas/schemaCategory');
const schemaUser = require('../../schemas/schemaUser');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { CATEGORY_NAME, FK_USER_ID } = req.body;

    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findByPk(FK_USER_ID);
    if (!user) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'The user does not exist.',
        code: 400
      });
    }

    //VERIFICA SE JÁ EXISTE ALGUMA CATEGORIA COM O NOME PASSADO NO 'CATEGORY_NAME'
    const categoryNotUnique = await schemaCategory.findOne({ where: { CATEGORY_NAME, FK_USER_ID: user.USER_ID } });
    if (categoryNotUnique) {
      return res.status(409).json({
        error: 'This category already exists',
        message: 'There is already a category with that name in the database.',
        code: 409
      });
    }

    //EXECUTA O POST
    const newCategory = await schemaCategory.create({ CATEGORY_NAME, FK_USER_ID });

    //RETORNA O RESULTADO
    res.status(201).json(newCategory);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'This inventory could not be created due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;