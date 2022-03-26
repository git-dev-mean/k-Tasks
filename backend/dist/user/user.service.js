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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userModel, jwt, config) {
        this.userModel = userModel;
        this.jwt = jwt;
        this.config = config;
    }
    async register(name, email, password) {
        try {
            const newUser = new this.userModel({
                name,
                email,
                password: await Bcrypt.hash(password, 10),
            });
            const result = await newUser.save();
            console.log(result);
            return result;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ForbiddenException(`Dumplicate ${Object.keys(error.keyValue)} entered`);
            }
            throw error;
        }
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email: email }).select('+password');
        console.log(user);
        if (!user)
            throw new common_1.ForbiddenException('User not found with this email');
        const isPasswordMatched = await Bcrypt.compare(password, user.password);
        if (!isPasswordMatched)
            throw new common_1.ForbiddenException('Incorrect password');
        return this.signToken(user.id, user.email);
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        console.log(users);
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        }));
    }
    async findUser(id) {
        console.log(id);
        let user;
        try {
            user = await this.userModel.findById(id).exec();
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
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
    async signToken(userId, email) {
        console.log(userId);
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return {
            access_token: token
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map