import request from 'supertest';
import app from '../../src/server';
import responseATM from '../fixtures/atms.json';
import supertest from 'supertest';

describe('atms functional tests', () => {
  it('should return a list ATMs near from API', (done) => {
    supertest(app)
      .get('/atm')
      .then((response) => {
        expect(response.body).toEqual(responseATM);
        return done();
      });
  }, 30000);
});
