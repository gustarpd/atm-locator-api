/* eslint-disable no-var */
// import { decodedUser } from '@src/service/auth';
import * as http from 'http';

declare global {
  var testRequest: import('supertest').SuperTest<import('supertest').Test>;
}

export {};
