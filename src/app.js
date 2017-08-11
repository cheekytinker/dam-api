import path from 'path';
import restify from 'restify';
import SwaggerRestify from 'swagger-restify-mw';
import { log } from './utilities/logging';
import appConfig from './config/appConfig';

let server = null;
let started = false;

function restServer() {
  if (server) {
    return server;
  }
  server = restify.createServer({
    name: appConfig.app.name,
    version: appConfig.app.version,
  });
  return server;
}

function startListening() {
  return new Promise((resolve, reject) => {
    try {
      restServer().listen(appConfig.app.restPort, () => {
        log.debug(`Listening on port ${appConfig.app.restPort}`);
        resolve();
      });
    } catch (err) /* istanbul ignore next */ {
      log.error(err);
      reject(err);
    }
  });
}

async function startRestServer(swaggerRestify) {
  log.debug('startRestServer');
  swaggerRestify.register(restServer());
  /* istanbul ignore next */
  server.use((errX, req, res, next) => {
    log.error(errX.stack);
    res.status(500).send('Something broke!');
    next();
  });
  await startListening();
}

async function swaggerRestifyCreate() {
  log.debug('Starting swaggerRestifyCreate');
  const swaggerPath = path.join(__dirname, 'config/swagger/swagger.yaml');
  const swaggerConfig = {
    appRoot: __dirname,
    swaggerFile: `${swaggerPath}`,
  };
  return new Promise((resolve, reject) => {
    SwaggerRestify.create(swaggerConfig, (err, swaggerRestify) => {
      /* istanbul ignore next */
      if (err) {
        log.error(`Error in swaggerRestifyCreate ${err}`);
        return reject(err);
      }
      log.debug('SwaggerRestify Create successful');
      return resolve(swaggerRestify);
    });
  });
}

async function startServer() {
  if (started) {
    return;
  }
  const swaggerRestify = await swaggerRestifyCreate();
  await startRestServer(swaggerRestify);
}

export default {
  start: () => startServer(),
  restart: () => {
    started = false;
    return startServer();
  },
};
