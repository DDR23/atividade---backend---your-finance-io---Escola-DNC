//CONFIG. PADRÃO DE ROTEAMENTO E IMPORTAÇÕES
const jwt = require('jsonwebtoken');

//FUNÇÃO DE VERIFICAÇÃO
function authenticateTokenAdmin(req, res, next) {

  //EXECUTA TODO ESSE BLOCO AO BATER NA ROTA
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //VERIFICA SE O TOKEN EXISTE
    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Token is required for authentication.'
      });
    }

    //VERIFICA SE JWT_SECRET ESTÁ DEFINIDO
    const secretAdmin = process.env.JWT_SECRET_ADMIN;
    if (!secretAdmin) {
      return res.status(500).json({
        error: 'Internal server error',
        message: 'JWT secret is not defined. Please check the server configuration.',
        code: 500
      });
    }
    
    //VERIFICA SE O TOKEN É VALIDO
    jwt.verify(token, secretAdmin, (err, user) => {
      if (err) {
        return res.status(403).json({
          error: 'Invalid token',
          message: 'Token is invalid or expired.',
          code: 403
        });
      }
      req.user = user;
      next();
    });

  //RETORNA ERRO CASO A EXECUÇÃO ACIMA FALHE
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while trying to authenticate the token. Please try again later.',
      code: 500
    });
  }
}

module.exports = authenticateTokenAdmin;
