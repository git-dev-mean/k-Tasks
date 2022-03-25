import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from '../user/guard';

@UseGuards(JwtGuard)
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create-task')
  async createTask(@Body('name') name: string) {
    const result = await this.taskService.createTask(name);
    return result;//{ id: result.id, name: result.name };
  }

  @Get('list-tasks')
  async getAllTasks() {
      const tasks = await this.taskService.getAllTasks();
      return tasks;
  }
}
