/* eslint-disable no-self-assign */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { AuthService } from '../../src/service/auth';

export interface User {
  toJSON(): object;
  _id?: string;
  name: string;
  email: string;
  password: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
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

schema.pre('save', async function(): Promise<void> {
  if (!this.password || !this.isModified('password')) {
    return;
  }
  try {
    const hashPassword = await AuthService.hashPassword(this.password)
    this.password = hashPassword;
  } catch (error) {
    console.log(`Error hashing the password for the user ${this.name}`);
  }
})

export const User = mongoose.model('User', schema);
