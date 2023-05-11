import userResponse from '../fixtures/user.json';
import { User } from '../../src/models/user';
import app from '../../src/server';
import supertest from 'supertest';

describe('user tests', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  it('should successfuly create a new user with encrypted password', async () => {
    const user = {
      name: 'gustavo',
      email: 'email23@email.com',
      password: 1234,
    };

    supertest(app)
      .post('create-new-user')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
      });
  });
});
