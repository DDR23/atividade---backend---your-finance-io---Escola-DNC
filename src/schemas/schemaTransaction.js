//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('./schemaUser');
const Category = require('./schemaCategory');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Transaction = sequelize.define('TB_TRANSACTION', {
  TRANSACTION_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TRANSACTION_DESCRIPTION: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  TRANSACTION_AMOUNT: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TRANSACTION_DATE: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  TRANSACTION_TYPE: {
    type: DataTypes.ENUM('Receita', 'Despesa'),
    allowNull: false
  },
  FK_USER_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'USER_ID'
    }
  },
  FK_CATEGORY_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'CATEGORY_ID'
    }
  }
},{
  tableName: 'TB_TRANSACTION',
  timestamps: false,
  indexes: [{
    name: 'fk_TB_TRANSACTION_TB_USER_idx',
    fields: ['FK_USER_ID']
  },{
    name: 'fk_TB_TRANSACTION_TB_CATEGORY1_idx',
    fields: ['FK_CATEGORY_ID']
  }]
});

Transaction.sync();

module.exports = Transaction;