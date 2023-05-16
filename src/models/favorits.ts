import mongoose from 'mongoose';

export interface FavoritsATM {
  name: string;
  lantitude: string;
  logitude: string;
}

const schema = new mongoose.Schema({
  name: { type: String },
  city: { type: String },
  line: { type: String },
});

export const Favorits = mongoose.model('favorits', schema);
