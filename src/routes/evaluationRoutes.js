const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateEvaluationCreate, validateEvaluationUpdate, validateUUID } = require('../middleware/validator');

/**
 * @swagger
 * /api/evaluations:
 *   get:
 *     summary: Obter todas as avaliações
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *       401:
 *         description: Não autenticado
 */
router.get('/', authenticate, authorize('View', 'Edit', 'Admin'), evaluationController.getAllEvaluations);

/**
 * @swagger
 * /api/evaluations/{id}:
 *   get:
 *     summary: Obter avaliação por ID
 *     tags: [Avaliações]
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
 *         description: Avaliação encontrada
 *       404:
 *         description: Avaliação não encontrada
 */
router.get('/:id', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, evaluationController.getEvaluationById);

/**
 * @swagger
 * /api/evaluations:
 *   post:
 *     summary: Criar nova avaliação
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie_id
 *               - rating
 *             properties:
 *               movie_id:
 *                 type: string
 *                 format: uuid
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Avaliação criada
 *       409:
 *         description: Já existe uma avaliação deste utilizador para este filme
 */
router.post('/', authenticate, authorize('View', 'Edit', 'Admin'), validateEvaluationCreate, evaluationController.createEvaluation);

/**
 * @swagger
 * /api/evaluations/{id}:
 *   put:
 *     summary: Atualizar avaliação
 *     tags: [Avaliações]
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
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avaliação atualizada
 *       403:
 *         description: Não tem permissão para editar esta avaliação
 */
router.put('/:id', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, validateEvaluationUpdate, evaluationController.updateEvaluation);

/**
 * @swagger
 * /api/evaluations/{id}:
 *   delete:
 *     summary: Eliminar avaliação
 *     tags: [Avaliações]
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
 *         description: Avaliação eliminada
 *       403:
 *         description: Não tem permissão para eliminar esta avaliação
 */
router.delete('/:id', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, evaluationController.deleteEvaluation);

module.exports = router;

