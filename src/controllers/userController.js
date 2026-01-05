const userService = require('../services/userService');

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      if (error.message === 'Utilizador não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      // Não retornar password
      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.papel,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
      res.status(201).json(userResponse);
    } catch (error) {
      if (error.message === 'Email já está em uso') {
        return res.status(409).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);
      // Não retornar password
      const userResponse = {
        id: user.id,
        email: user.email,
        role: user.papel,
        created_at: user.created_at,
        updated_at: user.updated_at
      };
      res.status(200).json(userResponse);
    } catch (error) {
      if (error.message === 'Utilizador não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Email já está em uso') {
        return res.status(409).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Utilizador não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = new UserController();

