//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaCategory = require('../../schemas/schemaCategory')

//REQUISIÇÃO HTTP
router.put('/edit/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE O INVENTARIO EXISTE
    const category = await schemaCategory.findByPk(req.params.id);
    if(!category){
      return res.status(404).json({
        error: 'Category not found',
        message: `That category you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //SALVA O NOVO VALOR
    category.CATEGORY_NAME = req.body.CATEGORY_NAME;

    //EXECUTA O PUT
    await category.save();

    //RETORNA O RESULTADO
    return res.status(200).json(category);

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'This category could not be edited due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;