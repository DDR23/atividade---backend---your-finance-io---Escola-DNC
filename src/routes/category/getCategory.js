//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaCategory = require('../../schemas/schemaCategory');
const authenticateToken = require('../../middlewares/authenticateToken');

//REQUISIÇÃO HTTP
router.get('/user', authenticateToken, async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //BUSCA TODAS AS INFORMAÇÕES DA TABELA DE CATEGORIA
    const category = await schemaCategory.findAll({ where: { FK_USER_ID: req.user.id } });

    //RETORNA O RESULTADO
    return res.status(200).json(category);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: `The category list could not be retrieved due to an internal server error. Please reload the page or try again later.`,
      code: 500
    });
  }
});

module.exports = router;
