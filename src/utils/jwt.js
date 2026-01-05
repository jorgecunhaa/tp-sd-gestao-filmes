const jwt = require('jsonwebtoken');

/**
 * Gera token JWT
 * @param {string} userId - ID do utilizador
 * @returns {string} Token JWT
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'default-secret',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
  );
};

/**
 * Verifica e decodifica token JWT
 * @param {string} token - Token JWT
 * @returns {object} Payload decodificado
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
};

module.exports = {
  generateToken,
  verifyToken
};

