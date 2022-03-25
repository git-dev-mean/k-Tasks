import { Task } from './task.model';
import { Model } from 'mongoose';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    createTask(name: string): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
}
