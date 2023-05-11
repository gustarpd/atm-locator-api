import app from '../src/server';
import supertest from 'supertest';
import path from 'path';

<<<<<<< HEAD
<<<<<<< HEAD
let request: any
let server: any

beforeAll(function(done){
  server = app.listen(done)
  request = supertest.agent(server)
})

afterAll(function(done){
  server.close(done)
})
=======
=======
>>>>>>> parent of 278c914 (oauth 1.o to request ATMs on mastercard API and tests implemented)

const composeFilePath = path.resolve(__dirname, '..');
const composeFile = 'docker-compose.yml';


let server: SetupServer;

beforeAll(async () => {
  server = new SetupServer();
  await server.init();
  global.testRequest = supertest(server.getApp());
}, 30000);

afterAll(async () => {
  await server.close();
<<<<<<< HEAD
}, 30000);
>>>>>>> parent of 278c914 (oauth 1.o to request ATMs on mastercard API and tests implemented)
=======
}, 30000);
>>>>>>> parent of 278c914 (oauth 1.o to request ATMs on mastercard API and tests implemented)
