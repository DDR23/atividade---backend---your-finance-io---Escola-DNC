//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('./schemaUser');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Category = sequelize.define('TB_CATEGORY', {
  CATEGORY_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CATEGORY_NAME: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FK_USER_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'USER_ID'
    }
  }
},{
  tableName: 'TB_CATEGORY',
  timestamps: false,
  indexes: [{
    name: 'fk_TB_CATEGORY_TB_USER1_idx',
    fields: ['FK_USER_ID']
  }]
});

Category.sync();

module.exports = Category;