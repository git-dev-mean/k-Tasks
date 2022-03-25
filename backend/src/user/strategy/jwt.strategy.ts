import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

import { User } from '../user.model';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(config: ConfigService,@InjectModel('User') private readonly userModel: Model<User>, ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {sub: string, email:string}){
        console.log({payload})
        const user = await this.userModel.findOne({ email: payload.email });
        delete user.password;
        return user;

    }
}