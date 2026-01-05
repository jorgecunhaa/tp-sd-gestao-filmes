const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateUserCreate, validateUserUpdate, validateUUID } = require('../middleware/validator');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obter todos os utilizadores
 *     tags: [Utilizadores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de utilizadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado (apenas Admin)
 */
router.get('/', authenticate, authorize('Admin'), userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obter utilizador por ID
 *     tags: [Utilizadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Utilizador encontrado
 *       404:
 *         description: Utilizador não encontrado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 */
router.get('/:id', authenticate, authorize('Admin'), validateUUID, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar novo utilizador
 *     tags: [Utilizadores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [View, Edit, Admin]
 *                 default: View
 *     responses:
 *       201:
 *         description: Utilizador criado com sucesso
 *       409:
 *         description: Email já está em uso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 */
router.post('/', authenticate, authorize('Admin'), validateUserCreate, userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar utilizador
 *     tags: [Utilizadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *                 enum: [View, Edit, Admin]
 *     responses:
 *       200:
 *         description: Utilizador atualizado
 *       404:
 *         description: Utilizador não encontrado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', authenticate, authorize('Admin'), validateUUID, validateUserUpdate, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar utilizador
 *     tags: [Utilizadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Utilizador eliminado
 *       404:
 *         description: Utilizador não encontrado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', authenticate, authorize('Admin'), validateUUID, userController.deleteUser);

module.exports = router;

