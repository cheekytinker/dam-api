const config = {
  app: {
    name: process.env.APPLICATION_NAME || 'dam-processor-api',
    version: process.env.APPLICATION_VERSION || '0.1.0',
    logDir: process.env.APPLICATION_LOG_DIR || './log',
    logLevel: process.env.APPLICATION_LOG_LEVEL || 'debug',
    restHost: process.env.REST_HOST || 'localhost',
    restPort: process.env.REST_PORT || '10010',
    dbHost: process.env.DB_HOST || 'localhost',
    amqpHost: process.env.AMQP_HOST || 'amqp://localhost:5672',
    defaultQueue: 'dam-processor',
  },
};

export default config;
