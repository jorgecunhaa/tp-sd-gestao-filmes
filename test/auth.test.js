const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');
const { User } = require('../src/models');
const { hashPassword } = require('../src/utils/password');

chai.use(chaiHttp);
const { expect } = chai;

describe('Autenticação', () => {
  before(async () => {
    // Criar utilizador de teste
    await User.create({
      email: 'test@example.com',
      senha: hashPassword('test123'),
      papel: 'View'
    });
  });

  after(async () => {
    // Limpar dados de teste
    await User.destroy({ where: { email: 'test@example.com' } });
  });

  describe('POST /api/auth/login', () => {
    it('Deve fazer login com credenciais válidas', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'test123'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('email', 'test@example.com');
          done();
        });
    });

    it('Deve retornar erro com credenciais inválidas', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('Deve retornar erro com email inválido', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: 'test123'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

