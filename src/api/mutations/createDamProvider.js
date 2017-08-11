import { log } from './../../utilities/logging';

async function doAMutation({ name }) {
  return Promise.resolve({
    id: 100,
    name,
  });
}

export default async function createDamProvider({ name, type }) {
  log.debug('createDamProvider');
  return new Promise(async (resolve, reject) => {
    try {
      const result = await doAMutation({ name, type });
      resolve({
        key: result.id,
        message: `Dam Provider "${result.name}" created`,
      });
    } catch (err) {
      reject(err);
    }
  });
}
