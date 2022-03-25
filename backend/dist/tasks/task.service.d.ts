import { Task } from './task.model';
import { Model } from 'mongoose';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    register(name: string, email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<boolean>;
    getUsers(): Promise<void>;
    findUser(id: string): Promise<Task>;
    getSingleUser(userId: string): Promise<void>;
}
