const { User } = require('../models');
const { hashPassword } = require('../utils/password');
const { Op } = require('sequelize');

class UserService {
  async getAllUsers() {
    return await User.findAll({
      attributes: { exclude: ['senha'] }, // Não retornar senha
      order: [['created_at', 'DESC']]
    });
  }

  async getUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['senha'] }
    });
    if (!user) {
      throw new Error('Utilizador não encontrado');
    }
    return user;
  }

  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(userData) {
    const { email, password, role = 'View' } = userData;
    
    // Verificar se email já existe
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }
    
    const hashedPassword = hashPassword(password);
    
    return await User.create({
      email,
      senha: hashedPassword,
      papel: role
    });
  }

  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Utilizador não encontrado');
    }
    
    const { email, password, role } = userData;
    
    // Verificar se email já existe (se estiver a mudar)
    if (email && email !== user.email) {
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email já está em uso');
      }
      user.email = email;
    }
    
    if (password) {
      user.senha = hashPassword(password);
    }
    
    if (role) {
      user.papel = role;
    }
    
    await user.save();
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Utilizador não encontrado');
    }
    
    await user.destroy();
    return { message: 'Utilizador eliminado com sucesso' };
  }
}

module.exports = new UserService();

