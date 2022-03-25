import { TaskService } from './task.service';
export declare class TaskController {
    private readonly userService;
    constructor(userService: TaskService);
    register(name: string, email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
    getAllUser(): Promise<void>;
    getUser(userId: string): Promise<void>;
}
