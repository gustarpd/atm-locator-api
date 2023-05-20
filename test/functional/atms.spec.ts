import request from 'supertest';
import { httpServer } from '../../src/server';
import responseATM from '../fixtures/atms.json';
import supertest from 'supertest';

describe('atms functional tests', () => {
  it('should return a list ATMs near from API', (done) => {
    supertest(httpServer)
      .get('/atm')
      .set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3VzdGF2byIsImVtYWlsIjoibWFpbDIzMkBtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JEV2Sk1qc05UcjRsdkFqM0Znby5NdXVoMGZJRE0xangydUs2UzNYblZuNHNrWDhlTEVnN3FtIiwiaWQiOiI2NDYxNmMxNmY1MGVlOTBjMTA3MjM3YTQiLCJpYXQiOjE2ODQxMDYyODEsImV4cCI6NDY4NDEwNjI4MX0.PD_IlN1N0NuSCZtWgywHVleFps9cDRpI0vuShBKBUVA`
      )
      .then((response) => {
        expect(response.body).toEqual(responseATM);
        return done();
      });
  }, 30000);

  it('should return not authorized if no token provided', (done) => {
    supertest(httpServer)
      .get('/atm')
      .then((response) => {
        expect(response.body).toEqual({ error: 'not authorized' });
        return done();
      });
  }, 30000);
});
