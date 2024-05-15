//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaCategory = require('../../schemas/schemaCategory');

//REQUISIÇÃO HTTP
router.delete('/delete/:id', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //VERIFICA SE A CATEGORIA EXISTE
    const category = await schemaCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        error: 'Category not found',
        message: `That category you're looking for doesn't exist in the database.`,
        code: 404
      });
    }

    //EXECUTA O DELETE
    await category.destroy();

    //RETORNA O RESULTADO
    res.status(200).json({
      message: 'category deleted successfully',
      code: 200
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: 'This category could not be deleted due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;