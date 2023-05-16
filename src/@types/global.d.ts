import { decodedUser } from '..//service/auth';
import * as http from 'http';
declare module 'mastercardOAuth' {
  export class GetOAuth {
    static generatePrivateKey(): string;
    static oauthHeaderAuthorization(url: string): string;
  }
}
declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    decoded?: decodedUser;
  }
}

export {};
