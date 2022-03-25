"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async register(name, email, password) {
        const newUser = new this.taskModel({ name, email, password });
        const result = await newUser.save();
        console.log(result);
        return result.id;
    }
    async login(email, password) {
        const result = new this.taskModel({ email, password });
        return true;
    }
    async getUsers() {
        const users = await this.taskModel.find().exec();
        console.log(users);
    }
    async findUser(id) {
        console.log(id);
        let user;
        try {
            user = await this.taskModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        if (!user) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        return user;
    }
    async getSingleUser(userId) {
        console.log(userId);
        const user = await this.findUser(userId);
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map