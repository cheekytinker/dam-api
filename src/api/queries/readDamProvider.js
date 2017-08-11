import { log } from './../../utilities/logging';

async function doAQuery() {
  return Promise.resolve({
    id: 100,
    name: 'A name',
  });
}

export default function readDamProvider() {
  log.debug('readDamProvider');
  return new Promise(async (resolve, reject) => {
    try {
      const result = await doAQuery();
      resolve({
        key: result.id,
      });
    } catch (err) {
      reject(err);
    }
  });
}
