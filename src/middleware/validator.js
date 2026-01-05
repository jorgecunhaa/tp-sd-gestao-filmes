const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware para verificar resultados da validação
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

// Validadores para User
const validateUserCreate = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password deve ter pelo menos 6 caracteres'),
  body('role').optional().isIn(['View', 'Edit', 'Admin']).withMessage('Role inválida'),
  validate
];

const validateUserUpdate = [
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password deve ter pelo menos 6 caracteres'),
  body('role').optional().isIn(['View', 'Edit', 'Admin']).withMessage('Role inválida'),
  validate
];

const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Password é obrigatória'),
  validate
];

// Validadores para Movie
const validateMovieCreate = [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('year').isInt({ min: 1888, max: new Date().getFullYear() + 1 }).withMessage('Ano inválido'),
  body('genre').notEmpty().withMessage('Género é obrigatório'),
  body('description').optional().isString(),
  body('director').optional().isString(),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duração deve ser um número positivo'),
  validate
];

const validateMovieUpdate = [
  body('title').optional().notEmpty().withMessage('Título não pode ser vazio'),
  body('year').optional().isInt({ min: 1888, max: new Date().getFullYear() + 1 }).withMessage('Ano inválido'),
  body('genre').optional().notEmpty().withMessage('Género não pode ser vazio'),
  body('description').optional().isString(),
  body('director').optional().isString(),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duração deve ser um número positivo'),
  validate
];

// Validadores para Evaluation
const validateEvaluationCreate = [
  body('rating').isInt({ min: 1, max: 10 }).withMessage('Rating deve ser entre 1 e 10'),
  body('comment').optional().isString(),
  validate
];

const validateEvaluationUpdate = [
  body('rating').optional().isInt({ min: 1, max: 10 }).withMessage('Rating deve ser entre 1 e 10'),
  body('comment').optional().isString(),
  validate
];

// Validadores para UUID
const validateUUID = [
  param('id').isUUID().withMessage('ID deve ser um UUID válido'),
  validate
];

module.exports = {
  validate,
  validateUserCreate,
  validateUserUpdate,
  validateLogin,
  validateMovieCreate,
  validateMovieUpdate,
  validateEvaluationCreate,
  validateEvaluationUpdate,
  validateUUID
};

