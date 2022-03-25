import { User } from './user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userModel;
    private jwt;
    private config;
    constructor(userModel: Model<User>, jwt: JwtService, config: ConfigService);
    register(name: string, email: string, password: string): Promise<User & {
        _id: any;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }[]>;
    findUser(id: string): Promise<User>;
    getSingleUser(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    signToken(userId: string, email: string): Promise<{
        access_token: string;
    }>;
}
