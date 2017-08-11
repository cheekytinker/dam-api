import { describe, it, before, after } from 'mocha';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import mochaAsync from './../../../../helpers/mochaAsync';
import { createDamProviderRest } from '../../../../../src/api/controllers/damProviderController';

const expect = chai.expect;
chai.use(dirtyChai);

describe('synchronizerController', () => {
  describe('when creating a dam provider', () => {
    let sandbox;
    before(() => {
      sandbox = sinon.sandbox.create();
    });
    after(() => {
      if (sandbox) {
        sandbox.restore();
      }
    });
    it('should return 201', mochaAsync(async () => {
      const next = () => {
      };
      const req = {};
      const res = {
        json: () => {},
        status: () => {},
      };
      const resMock = sandbox.mock(res, 'status');
      resMock.expects('status').once().withArgs(201);
      await createDamProviderRest(req, res, next);
      resMock.verify();
    }));
  });
});
