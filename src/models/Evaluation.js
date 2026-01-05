const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evaluation = sequelize.define('Evaluation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  utilizador_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'utilizador_id',
    references: {
      model: 'utilizadores',
      key: 'id'
    }
  },
  filme_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'filme_id',
    references: {
      model: 'filmes',
      key: 'id'
    }
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'nota',
    validate: {
      min: 1,
      max: 10
    }
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'comentario'
  }
}, {
  tableName: 'avaliacoes',
  timestamps: true,
  underscored: false,
  indexes: [
    {
      unique: true,
      fields: ['utilizador_id', 'filme_id']
    }
  ]
});

module.exports = Evaluation;

