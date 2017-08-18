/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import shortid from 'shortid';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import { defineSupportCode } from 'cucumber';
import supertest from 'supertest';
import config from '../../../../src/config/appConfig';

const expect = chai.expect;
chai.use(dirtyChai);

function requestCreateDamProvider(name, type) {
  return supertest(`${config.app.restHost}:${config.app.restPort}`)
    .post('/damProviders/')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ name, type })
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then(res => Promise.resolve({ status: res.status, body: res.body }));
}

const PLACEHOLDERS = [
  'damProviderName',
];

function replacePlaceHolders(world, responseMessage) {
  let ret = responseMessage;
  PLACEHOLDERS.forEach((ph) => {
    ret = ret.replace(`<${ph}>`, world[ph]);
  });
  return ret;
}

defineSupportCode(({ Given, When, Then }) => {
  Given(/^an Dam Provider named '([^']*)'$/,
    function (damProviderName) {
      if (damProviderName === '<autogenerate>') {
        this.damProviderName = shortid.generate();
      } else {
        this.damProviderName = damProviderName;
      }
      return Promise.resolve();
    });

  Given(/^the Dam Provider type is '([^']*)'$/,
    function (type) {
      this.damProviderType = type;
      return Promise.resolve();
    });

  When(/^a request is made to create a Dam Provider$/,
    function () {
      this.responseCode = null;
      this.responseBody = null;
      const world = this;
      return requestCreateDamProvider(
        this.damProviderName,
        this.damProviderType,
      )
        .then((res) => {
          world.responseCode = res.status;
          world.responseBody = res.body;
        });
    });

  Then(/^we expect the response to be (\d+) '([^']*)'$/,
    function (responseCode, responseMessage) {
      const message = replacePlaceHolders(this, responseMessage);
      expect(this.responseCode).to.equal(responseCode);
      expect(this.responseBody.message).to.equal(message);
      return Promise.resolve();
    });
});
