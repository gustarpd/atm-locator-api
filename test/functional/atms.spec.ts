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
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlMnIgbmFtZSIsImVtYWlsIjoiZXN3QG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDUkZDZWSHVucDBET0c5M1EyRUw4U1VDT0U3ay9FYUNBYnlGcFNQRktWaGI2c0NLZXdPZUpndmUiLCJpZCI6IjY0NmJjOWZlMWUzOWVhZGY3MjFmMDA4YSIsImlhdCI6MTY4NDc4NTY3MywiZXhwIjo0Njg0Nzg1NjczfQ.GrZOd11_1Udt6D3rkPhEos9lu5wSNbmggCFg_wtoN1w`
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
