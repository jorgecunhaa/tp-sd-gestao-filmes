const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');
const { User, Movie } = require('../src/models');
const { hashPassword } = require('../src/utils/password');
const { generateToken } = require('../src/utils/jwt');

chai.use(chaiHttp);
const { expect } = chai;

describe('Filmes', () => {
  let authToken;
  let testUser;
  let testMovie;

  before(async () => {
    // Criar utilizador de teste
    testUser = await User.create({
      email: 'movietest@example.com',
      password: hashPassword('test123'),
      role: 'Edit'
    });
    authToken = generateToken(testUser.id);
  });

  after(async () => {
    // Limpar dados de teste
    if (testMovie) {
      await Movie.destroy({ where: { id: testMovie.id } });
    }
    await User.destroy({ where: { id: testUser.id } });
  });

  describe('POST /api/movies', () => {
    it('Deve criar um novo filme', (done) => {
      chai.request(app)
        .post('/api/movies')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Movie',
          year: 2023,
          genre: 'Action',
          description: 'A test movie',
          director: 'Test Director',
          duration: 120
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('title', 'Test Movie');
          testMovie = res.body;
          done();
        });
    });

    it('Deve retornar erro sem autenticação', (done) => {
      chai.request(app)
        .post('/api/movies')
        .send({
          title: 'Test Movie',
          year: 2023,
          genre: 'Action'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('Deve retornar erro com dados inválidos', (done) => {
      chai.request(app)
        .post('/api/movies')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '',
          year: 'invalid'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('GET /api/movies', () => {
    it('Deve obter todos os filmes', (done) => {
      chai.request(app)
        .get('/api/movies')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/movies/:id', () => {
    it('Deve obter um filme por ID', (done) => {
      if (!testMovie) {
        return done();
      }
      chai.request(app)
        .get(`/api/movies/${testMovie.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id', testMovie.id);
          done();
        });
    });

    it('Deve retornar 404 para filme inexistente', (done) => {
      chai.request(app)
        .get('/api/movies/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

