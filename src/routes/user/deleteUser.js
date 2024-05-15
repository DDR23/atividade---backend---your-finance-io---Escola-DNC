//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaUser = require('../../schemas/schemaUser');
const schemaCategory = require('../../schemas/schemaCategory');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {
    
    //VERIFICA SE O USUARIO EXISTE
    const user = await schemaUser.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: `That user you're looking for doesn't exist in the database.`,
        code: 404
      });
    };

    //DELETE TODOS OS REGISTROS DAS OUTRAS TABELAS QUE FAZEM REFERENCIA A ESSE USUARIO
    await schemaCategory.destroy({ where: { FK_USER_ID: req.params.id } });

    //EXECUTA O DELETE
    await user.destroy();

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'user deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This user could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;