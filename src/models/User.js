const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'senha' // Mapear para a coluna 'senha' na BD
  },
  papel: {
    type: DataTypes.ENUM('View', 'Edit', 'Admin'),
    defaultValue: 'View',
    allowNull: false,
    field: 'papel' // Mapear para a coluna 'papel' na BD
  }
}, {
  tableName: 'utilizadores',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;

