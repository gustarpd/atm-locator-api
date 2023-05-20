import mongoose, { Schema } from 'mongoose';

export interface FavoritsATM {
  id: string;
  name: string;
  city: string;
  line: string;
  distance: string;
  latintude: string;
  longitude: string;
}

const schema = new mongoose.Schema(
  {
    name: String,
    city: String,
    line: String,
    distance: String,
    latintude: String,
    longitude: String,
    id: String
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Favorits = mongoose.model<FavoritsATM>('favorits', schema);
