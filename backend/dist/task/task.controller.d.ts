import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(name: string): Promise<import("./task.model").Task>;
    getAllTasks(): Promise<import("./task.model").Task[]>;
}
