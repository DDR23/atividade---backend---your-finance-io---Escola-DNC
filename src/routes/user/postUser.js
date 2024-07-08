//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaUser = require('../../schemas/schemaUser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

//REQUISIÇÃO HTTP
router.post('/create', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { USER_EMAIL, USER_NAME, USER_PASSWORD } = req.body;

    //VERIFICA SE JÁ EXISTE ALGUM USUARIO COM O EMAIL PASSADO NO 'USER_EMAIL'
    const existingUser  = await schemaUser.findOne({ where: { USER_EMAIL } });
    if (existingUser ) {
      return res.status(409).json({
        error: 'This email already exists',
        message: 'There is already a user with that email in the database.',
        code: 409
      });
    }

    //CRIPTOGRAFA A SENHA USANDO ARGON2
    const hashedPassword = await argon2.hash(USER_PASSWORD);

    //EXECUTA O POST
    const newUser = await schemaUser.create({ USER_EMAIL, USER_NAME, USER_PASSWORD: hashedPassword });
    
    //GERA UM TOKEN JWT PARA O NOVO USUÁRIO
    const token = jwt.sign({ id: newUser.USER_ID }, process.env.JWT_SECRET, { expiresIn: '20h' })

    //RETORNA O TOKEN
    return res.status(201).json({ token });

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