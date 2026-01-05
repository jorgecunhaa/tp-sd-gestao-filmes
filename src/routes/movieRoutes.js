const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const evaluationController = require('../controllers/evaluationController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateMovieCreate, validateMovieUpdate, validateEvaluationCreate, validateEvaluationUpdate, validateUUID } = require('../middleware/validator');

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Obter todos os filmes
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filtrar por género
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filtrar por ano
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar em título, descrição ou diretor
 *     responses:
 *       200:
 *         description: Lista de filmes
 *       401:
 *         description: Não autenticado
 */
router.get('/', authenticate, authorize('View', 'Edit', 'Admin'), movieController.getAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Obter filme por ID
 *     tags: [Filmes]
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
 *         description: Filme encontrado
 *       404:
 *         description: Filme não encontrado
 */
router.get('/:id', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, movieController.getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Criar novo filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *           example:
 *             title: "Interstellar"
 *             year: 2014
 *             genre: "Sci-Fi"
 *             description: "A team of explorers travel through a wormhole in space"
 *             director: "Christopher Nolan"
 *             duration: 169
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Acesso negado (requer Edit ou Admin)
 */
router.post('/', authenticate, authorize('Edit', 'Admin'), validateMovieCreate, movieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Atualizar filme
 *     tags: [Filmes]
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
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Filme atualizado
 *       404:
 *         description: Filme não encontrado
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', authenticate, authorize('Edit', 'Admin'), validateUUID, validateMovieUpdate, movieController.updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Eliminar filme
 *     tags: [Filmes]
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
 *         description: Filme eliminado
 *       404:
 *         description: Filme não encontrado
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', authenticate, authorize('Edit', 'Admin'), validateUUID, movieController.deleteMovie);

/**
 * @swagger
 * /api/movies/{id}/evaluations:
 *   get:
 *     summary: Obter todas as avaliações de um filme
 *     tags: [Filmes]
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
 *         description: Lista de avaliações do filme
 *       404:
 *         description: Filme não encontrado
 */
router.get('/:id/evaluations', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, movieController.getMovieEvaluations);

/**
 * @swagger
 * /api/movies/{id}/evaluations:
 *   post:
 *     summary: Criar avaliação para um filme
 *     tags: [Filmes]
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
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
router.post('/:id/evaluations', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, validateEvaluationCreate, evaluationController.createMovieEvaluation);

/**
 * @swagger
 * /api/movies/{id}/evaluations/{evaluationId}:
 *   get:
 *     summary: Obter avaliação específica de um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: evaluationId
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
router.get('/:id/evaluations/:evaluationId', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, evaluationController.getMovieEvaluation);

/**
 * @swagger
 * /api/movies/{id}/evaluations/{evaluationId}:
 *   put:
 *     summary: Atualizar avaliação de um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: evaluationId
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
router.put('/:id/evaluations/:evaluationId', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, validateEvaluationUpdate, evaluationController.updateMovieEvaluation);

/**
 * @swagger
 * /api/movies/{id}/evaluations/{evaluationId}:
 *   delete:
 *     summary: Eliminar avaliação de um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: evaluationId
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
router.delete('/:id/evaluations/:evaluationId', authenticate, authorize('View', 'Edit', 'Admin'), validateUUID, evaluationController.deleteMovieEvaluation);

module.exports = router;

