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

  async getAllTasks() {
    const tasks = await this.taskModel.find().exec();
    console.log(tasks);
    return tasks.map((task) => ({
      id: task.id,
      name: task.name,
    }));
  }

  async deleteTasks(tasks: Task[]): Promise<any> {
    // const result = await this.taskModel.deleteMany({id:{tasks.map(task => task.id)}})
    // const result = await this.taskModel.deleteMany({_id:{$in:{tasks.map(task => task.id)}}})
    // const result = await newTask.save();
    const taskIds = tasks.map((task) => task.id);
    const result = await this.taskModel.deleteMany({ _id: { $in: taskIds } });
    console.log('delete TASKS', result);
    return result;
  }
}
