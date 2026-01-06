const userService = require('./userService');
const { comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

class AuthService {
  async login(email, password) {
    const user = await userService.getUserByEmail(email);
    
    if (!user) {
      const error = new Error('Credenciais inválidas');
      error.statusCode = 401;
      throw error;
    }
    
    const isPasswordValid = comparePassword(password, user.senha);
    
    if (!isPasswordValid) {
      const error = new Error('Credenciais inválidas');
      error.statusCode = 401;
      throw error;
    }
    
    const token = generateToken(user.id);
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.papel
      }
    };
  }
}

module.exports = new AuthService();

