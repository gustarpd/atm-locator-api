import { connect as mongooseConnect, connection } from 'mongoose';

export const connect = async (): Promise<void> => {
  await mongooseConnect(process.env.DATABASE_URL as string);
};

export const close = (): Promise<void> => connection.close();