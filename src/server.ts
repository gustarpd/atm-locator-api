import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/router';
import { ATMLocationController } from './controllers/atm-locations-controller';
import { connect } from './database';

dotenv.config();
connect()
const server = express();

server.use(cors());
server.use(express.json())
server.use(router);
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(3000, () => console.log('Server listening of 3000'))

export default server