require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { syncModels } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Gestão de Filmes - Documentação'
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API está a funcionar corretamente',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.path
  });
});

// Error Handler (deve ser o último middleware)
app.use(errorHandler);

// Iniciar servidor (apenas se não estiver em modo de teste)
const startServer = async () => {
  try {
    // Sincronizar modelos (apenas valida conexão)
    await syncModels();
    
    // Não iniciar servidor em modo de teste
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor a correr na porta ${PORT}`);
      console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Só iniciar servidor se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;

