//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const express = require('express');
const router = express.Router();
const schemaUser = require('../../schemas/schemaUser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

//REQUISIÇÃO HTTP
router.post('/login', async (req, res) => {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {

    //GUARDA O CONTEÚDO QUE VEM DO BODY
    const { USER_EMAIL, USER_PASSWORD } = req.body;

    //VERIFICA SE O USUÁRIO EXISTE
    const user = await schemaUser.findOne({ where: { USER_EMAIL } });
    if (!user) {
      return res.status(400).json({
        error: 'Invalid email or password',
        message: 'The email or password is incorrect.',
        code: 400
      });
    }

    //VERIFICA A SENHA USANDO ARGON2
    const isPasswordValid = await argon2.verify(user.USER_PASSWORD, USER_PASSWORD);
    if(!isPasswordValid) {
      return res.status(400).json({
        error: 'Invalid email or password',
        message: 'The email or password is incorrect.',
        code: 400
      });
    }

    //GERA O TOKEN JTW
    const token = jwt.sign({ id: user.USER_ID }, process.env.JWT_SECRET, { expiresIn: '20h' });

    //RETORNA O TOKEN
    return res.status(200).json({ token });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Login failed due to an internal server error. Please try again later.',
      code: 500
    });
  }
});

module.exports = router;