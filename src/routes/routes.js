//ESSA FUNÇÃO É CHAMADA NO APP.JS E ELA DETERMINA OS ARQUIVOS COM FUNÇÕES QUE CADA ROTA DEVE DISPARAR
function routes(app) {
  //HOME
  app.use('/', require('./index'));

  //USER
  app.use('/user', require('./user/postUser'));
  app.use('/user', require('./user/loginUser'));
  app.use('/user', require('./user/getUser'));
  app.use('/user', require('./user/getOneUser'));
  app.use('/user', require('./user/putUser'));
  app.use('/user', require('./user/deleteUser'));

  //CATEGORY
  app.use('/category', require('./category/postCategory'));
  app.use('/category', require('./category/getCategory'));
  app.use('/category', require('./category/getOneCategory'));
  app.use('/category', require('./category/putCategory'));
  app.use('/category', require('./category/deleteCategory'));
  
  //GOAL
  app.use('/goal', require('./goal/postGoal'));
  app.use('/goal', require('./goal/getGoal'));
  app.use('/goal', require('./goal/getOneGoal'));
  app.use('/goal', require('./goal/putGoal'));
  app.use('/goal', require('./goal/deleteGoal'));

  //TRANSACTION
  app.use('/transaction', require('./transaction/postTransaction'));
  app.use('/transaction', require('./transaction/getTransaction'));
  app.use('/transaction', require('./transaction/getOneTransaction'));
  app.use('/transaction', require('./transaction/putTransaction'));
  app.use('/transaction', require('./transaction/deleteTransaction'));
};

module.exports = routes;