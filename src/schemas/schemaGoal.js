//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('./schemaUser');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const Goal = sequelize.define('TB_GOAL', {
  GOAL_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  GOAL_NAME: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  GOAL_AMOUNT: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  GOAL_DEADLINE: {
    type: DataTypes.DATEONLY,
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
  tableName: 'TB_GOAL',
  timestamps: false,
  indexes: [{
    name: 'fk_TB_GOAL_TB_USER1_idx',
    fields: ['FK_USER_ID']
  }]
});

Goal.sync();

module.exports = Goal;