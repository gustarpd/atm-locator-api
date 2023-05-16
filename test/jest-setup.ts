import { closeServer } from '../src/server';
import supertest from 'supertest';
import path from 'path';


const composeFilePath = path.resolve(__dirname, '..');
const composeFile = 'docker-compose.yml';

afterAll(async () => {
  closeServer();
}, 30000);