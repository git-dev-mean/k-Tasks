import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { User } from '../user.model';
import { Model } from 'mongoose';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(config: ConfigService, userModel: Model<User>);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<User & {
        _id: any;
    }>;
}
export {};
