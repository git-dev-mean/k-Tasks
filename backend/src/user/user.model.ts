import * as mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters.'],
    select: false,
  },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}
