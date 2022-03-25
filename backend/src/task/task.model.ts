import * as mongoose from 'mongoose';


export const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
  }
});

export interface Task extends mongoose.Document {
  id: string;
  name: string;
}


