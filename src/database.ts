import { connect as mongooseConnect, connection } from 'mongoose';

export const connect = async (): Promise<void> => {
  await mongooseConnect(process.env.DATABASE_URL as string);
  console.log('banco de dados iniciado com sucesso')
};

export const close = (): Promise<void> => connection.close();