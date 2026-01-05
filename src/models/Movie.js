const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'titulo'
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ano',
    validate: {
      min: 1888, // Primeiro filme da história
      max: new Date().getFullYear() + 1
    }
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'genero'
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'descricao'
  },
  realizador: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'realizador'
  },
  duracao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'duracao',
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'filmes',
  timestamps: true,
  underscored: false
});

module.exports = Movie;

