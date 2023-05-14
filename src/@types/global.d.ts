/* eslint-disable no-var */
// import { decodedUser } from '@src/service/auth';
declare module 'mastercardOAuth' {
  import forge from 'node-forge';
  import fs from 'fs';
  import oauth from 'mastercard-oauth1-signer';

  export class GetOAuth {
    static generatePrivateKey(): string;
    static oauthHeaderAuthorization(url: string): string;
  }
}
