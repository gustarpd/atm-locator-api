import mongoose, { Schema } from 'mongoose';

export interface FavoritsATM {
  name: string;
  lantitude: string;
  logitude: string;
}

const schema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String },
    city: { type: String },
    line: { type: String },
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

export const Favorits = mongoose.model('favorits', schema);
