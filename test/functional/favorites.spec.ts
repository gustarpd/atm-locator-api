import supertest from 'supertest';
import { httpServer } from '../../src/server';
import { User } from '../../src/models/user';
describe('Favorits user`s ATM', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  const testRequest = supertest(httpServer);
  const user = {
    name: 'any_name',
    email: 'any_mail_valid@mail.com',
    password: 'any_password',
  };
  it('should create ATM favorites for the users', async () => {
    const getUserToken = await testRequest
      .post('/create-new-user')
      .send(user)
      .expect(201);
    await testRequest
      .post('/favorites')
      .send({ name: 'MA', city: 'IMP', line: '21' })
      .set('Authorization', `Bearer ${getUserToken.body.token}`)
      .expect(201)
  });
});
