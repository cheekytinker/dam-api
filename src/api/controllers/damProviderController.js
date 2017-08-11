import { log } from './../../utilities/logging';
import errorCodes from './../../utilities/errorCodes';
import createDamProvider from '../mutations/createDamProvider';
import readDamProvider from '../queries/readDamProvider';

/*
* REST wrapper for mutation function that will also be called from graph ql
* */
async function createDamProviderRest(req, res, next) {
  log.debug('createDamProviderRest');
  try {
    const { name, type } = req.body;
    const result = await createDamProvider({ name, type });
    res.status(201);
    res.json(result);
    next();
  } catch (err) {
    if (err.code && (err.code === errorCodes.INVALID_REQUEST)) {
      log.debug(`Bad request ${err.message}`);
      res.status(400);
      res.json({
        message: err.message,
      });
      next();
      return;
    }
    log.error(err);
    res.status(500);
    res.json({
      message: err.message,
    });
    next();
  }
}

async function readDamProviderRest(req, res, next) {
  log.debug('readDamProviderRest');
  try {
    const result = await readDamProvider(req.body);
    res.status(200);
    res.json(result);
    next();
  } catch (err) {
    if (err.code && err.code === errorCodes.NOT_FOUND) {
      log.debug(`Not Found ${err.message}`);
      res.status(404);
      res.json({
        message: err.message,
      });
      next();
      return;
    }
    if (err.code && (err.code === errorCodes.INVALID_REQUEST)) {
      log.debug(`Bad request ${err.message}`);
      res.status(400);
      res.json({
        message: err.message,
      });
      next();
      return;
    }
    log.error(err);
    res.status(500);
    res.json({
      message: err.message,
    });
    next();
  }
}

export {
  createDamProviderRest,
  readDamProviderRest,
};
