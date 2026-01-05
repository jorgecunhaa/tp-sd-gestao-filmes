const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');
const { User, Movie, Evaluation } = require('../src/models');
const { hashPassword } = require('../src/utils/password');
const { generateToken } = require('../src/utils/jwt');

chai.use(chaiHttp);
const { expect } = chai;

describe('Avaliações', () => {
  let authToken;
  let testUser;
  let testMovie;
  let testEvaluation;

  before(async () => {
    // Criar utilizador de teste
    testUser = await User.create({
      email: 'evaltest@example.com',
      password: hashPassword('test123'),
      role: 'View'
    });
    authToken = generateToken(testUser.id);

    // Criar filme de teste
    testMovie = await Movie.create({
      title: 'Evaluation Test Movie',
      year: 2023,
      genre: 'Drama'
    });
  });

  after(async () => {
    // Limpar dados de teste
    if (testEvaluation) {
      await Evaluation.destroy({ where: { id: testEvaluation.id } });
    }
    if (testMovie) {
      await Movie.destroy({ where: { id: testMovie.id } });
    }
    await User.destroy({ where: { id: testUser.id } });
  });

  describe('POST /api/movies/:id/evaluations', () => {
    it('Deve criar uma avaliação para um filme', (done) => {
      chai.request(app)
        .post(`/api/movies/${testMovie.id}/evaluations`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          rating: 8,
          comment: 'Great movie!'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('rating', 8);
          testEvaluation = res.body;
          done();
        });
    });

    it('Deve retornar erro ao tentar criar avaliação duplicada', (done) => {
      chai.request(app)
        .post(`/api/movies/${testMovie.id}/evaluations`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          rating: 9,
          comment: 'Another comment'
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });

    it('Deve retornar erro com rating inválido', (done) => {
      chai.request(app)
        .post(`/api/movies/${testMovie.id}/evaluations`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          rating: 15, // Inválido (deve ser 1-10)
          comment: 'Test'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('GET /api/movies/:id/evaluations', () => {
    it('Deve obter todas as avaliações de um filme', (done) => {
      chai.request(app)
        .get(`/api/movies/${testMovie.id}/evaluations`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});

