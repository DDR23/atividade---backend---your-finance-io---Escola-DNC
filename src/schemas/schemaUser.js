//CONFIG E IMPORTAÇÕES
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

//ESSE SCHEMA CRIA AUTOMATICAMENTE A TABELA NO BANCO DE DADOS
const User = sequelize.define('TB_USER', {
  USER_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  USER_EMAIL: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: 'USER_EMAIL_UNIQUE'
  },
  USER_NAME: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  USER_PASSWORD: {
    type: DataTypes.STRING(97),
    allowNull: false
  },
  USER_ADMIN: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  USER_DELETED: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},{
  tableName: 'TB_USER',
  timestamps: true,
  indexes: [{
    name: 'USER_EMAIL_UNIQUE',
    unique: true,
    fields: ['USER_EMAIL']
  }]
});

User.sync();

module.exports = User;