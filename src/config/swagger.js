const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Filmes',
      version: '1.0.0',
      description: 'API REST para gestão de catálogo de filmes com sistema de avaliações e comentários',
      contact: {
        name: 'Nuno Carneiro & Jorge Cunha',
        email: 'nuno.carneiro@example.com'
      }
    },
    servers: [
      {
        url: `http://${process.env.SWAGGER_HOST || 'localhost:3000'}`,
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do endpoint /api/auth/login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do utilizador'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do utilizador'
            },
            role: {
              type: 'string',
              enum: ['View', 'Edit', 'Admin'],
              description: 'Nível de permissão do utilizador'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Movie: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do filme'
            },
            title: {
              type: 'string',
              description: 'Título do filme'
            },
            year: {
              type: 'integer',
              description: 'Ano de lançamento'
            },
            genre: {
              type: 'string',
              description: 'Género do filme'
            },
            description: {
              type: 'string',
              description: 'Descrição do filme'
            },
            director: {
              type: 'string',
              description: 'Diretor do filme'
            },
            duration: {
              type: 'integer',
              description: 'Duração em minutos'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Evaluation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da avaliação'
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do utilizador que fez a avaliação'
            },
            movie_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do filme avaliado'
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 10,
              description: 'Nota de 1 a 10'
            },
            comment: {
              type: 'string',
              description: 'Comentário sobre o filme'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              format: 'password'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT para autenticação'
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                email: { type: 'string' },
                role: { type: 'string' }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            details: {
              type: 'array',
              items: {
                type: 'object'
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};

