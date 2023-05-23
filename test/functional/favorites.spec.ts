import supertest from 'supertest';
import { httpServer } from '../../src/server';
import { User } from '../../src/models/user';
import { Favorits } from '../../src/models/favorits';
describe('Favorits user`s ATM', () => {
  beforeEach(async () => {
    await Favorits.deleteMany({});
  });
  const testRequest = supertest(httpServer);
  const user = {
    name: 'any_name',
    email: 'any_mail_valid1@mail.com',
    password: 'any_password',
  };
  it('should create ATM favorites for the users', async () => {
    const getUserToken = await testRequest
      .post('/create-new-user')
      .send(user)
      .expect(201);
      
    await testRequest
      .post('/favorites')
      .send({
        name: "user name",
        city: "some city",
        line: "any line",
        distance: 38.76006576913497,
        latintude: -90.74615107952418,
        longitude: 0.93,
      },)
      .set('Authorization', `Bearer ${getUserToken.body.token}`)
      .expect(201);
  });
  it('should return 400 if user are not found', async () => {
    testRequest
      .post('/favorites')
      .send({ name: 'MA', city: 'IMP', line: '21' })
      .set('Authorization', `Bearer any_token_invalid`)
      .expect(400);
  }, 7000);
});
