import userResponse from '../fixtures/user.json';
import { User } from '../../src/models/user';
import { httpServer } from '../../src/server';
import supertest from 'supertest';

describe('user tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should successfuly create a new user with encrypted password', (done) => {
    const user = {
      name: 'gustavo',
      email: 'validmail1@email.com',
      password: 1234,
    };

    supertest(httpServer)
      .post('/create-new-user')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
        return done();
      });
  });

  it('should return an erro if send invalid credencials', (done) => {
    const user = {
      email: 'email23@email.com',
      password: 1234,
    };

    supertest(httpServer)
      .post('/create-new-user')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(400);
        return done();
      });
  }, 5000);

  it('shoul return a list of user`s atm favorite when request successfull', async () => {
    const createUserResponse = await supertest(httpServer)
      .post('/create-new-user')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'some-pass',
      });

    const userId = createUserResponse.body.user.id;
    await supertest(httpServer)
      .post(`/me/${userId}`)
      .expect(200);
  }, 10000);

  it('should return 400 if no userId is provided', () => {
    supertest(httpServer).post(`/me/`).expect(400);
  });
});
