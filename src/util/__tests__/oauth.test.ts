import { GetOAuth } from '../mastercardOAuth';
import dotenv from 'dotenv';
dotenv.config();

describe('OAuth tests', () => {
  it('should correctly extract the private key from the file and return it in PEM format', () => {
    const classOauth = GetOAuth.generatePrivateKey();
    const privateKey = classOauth;
    expect(typeof privateKey).toBe('string');
  });

  it('should retuns a string if the header authorization is return', () => {
    const classOauth = GetOAuth.oauthHeaderAuthorization(
      process.env.MASTERCARD_API_URL as string
    );
    const authHeader = classOauth;
    expect(typeof authHeader).toBe('string');
  });

  it('should reurns a TypeError if no url valid is provided', () => {
    try {
      GetOAuth.oauthHeaderAuthorization('some-url-invalid');
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
    }
  });
});
