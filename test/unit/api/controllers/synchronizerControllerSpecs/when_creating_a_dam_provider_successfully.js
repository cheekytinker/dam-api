import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import mochaAsync from './../../../../helpers/mochaAsync';
import * as cdp from '../../../../../src/api/mutations/createDamProvider';
import { createDamProviderRest } from '../../../../../src/api/controllers/damProviderController';

describe('damProviderController', () => {
  describe('when creating a dam provider', () => {
    const next = () => {
    };
    const res = {
      json: () => {},
      status: () => {},
    };
    const sandbox = sinon.sandbox.create();
    let cdpStub;
    beforeEach(() => {
      cdpStub = sandbox.stub(cdp.default, 'createDamProvider');
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should return 201', mochaAsync(async () => {
      cdpStub.returns({ key: '123', message: 'Created' });
      const resMock = sandbox.mock(res, 'status');
      resMock.expects('status').once().withArgs(201);
      const req = { body: { name: 'MyProvider', type: 'StarLabs' } };
      await createDamProviderRest(req, res, next);
      resMock.verify();
    }));
  });
});
