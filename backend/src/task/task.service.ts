import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.model';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(name: string): Promise<Task> {
    const newTask = new this.taskModel({ name });
    const result = await newTask.save();
    console.log(result);
    return result;
    // return {
    //   id: result.id,
    //   name: result.name,
    // };
  }

  async getAllTasks() : Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    console.log(tasks);
    return tasks;
    // return tasks.map((task) => ({
    //   id: task.id,
    //   name: task.name,
    // }));
  }
}
