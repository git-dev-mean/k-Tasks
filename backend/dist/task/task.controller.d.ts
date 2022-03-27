import { TaskService } from './task.service';
import { Task } from './task.model';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(name: string): Promise<Task>;
    getAllTasks(): Promise<{
        id: string;
        name: string;
    }[]>;
    deleteTasks(tasks: Task[]): Promise<any>;
}
