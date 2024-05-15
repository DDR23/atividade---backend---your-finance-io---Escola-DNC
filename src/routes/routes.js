//ESSA FUNÇÃO É CHAMADA NO APP.JS E ELA DETERMINA OS ARQUIVOS COM FUNÇÕES QUE CADA ROTA DEVE DISPARAR
function routes(app) {
  //HOME
  // app.use('/', require('./index'));

  //USER
  app.use('/user', require('./user/postUser'));
  app.use('/user', require('./user/getUser'));
  app.use('/user', require('./user/getOneUser'));
  app.use('/user', require('./user/putUser'));
  app.use('/user', require('./user/deleteUser'));
};

module.exports = routes;