const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware para verificar token JWT
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Token de autenticação não fornecido'
      });
    }
    
    const token = authHeader.substring(7); // Remove "Bearer "
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      
      if (!user) {
        return res.status(401).json({
          error: 'Utilizador não encontrado'
        });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'Token inválido ou expirado'
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao autenticar utilizador'
    });
  }
};

/**
 * Middleware para verificar permissões
 * @param {Array} allowedRoles - Array de roles permitidas (ex: ['Edit', 'Admin'])
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Utilizador não autenticado'
      });
    }
    
    if (!allowedRoles.includes(req.user.papel)) {
      return res.status(403).json({
        error: 'Acesso negado. Permissões insuficientes.'
      });
    }
    
    next();
  };
};

/**
 * Helper para verificar se o utilizador é o dono do recurso ou Admin
 */
const isOwnerOrAdmin = (req, resourceUserId) => {
  return req.user.papel === 'Admin' || req.user.id === resourceUserId;
};

module.exports = {
  authenticate,
  authorize,
  isOwnerOrAdmin
};

