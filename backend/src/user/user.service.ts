import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as Bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(name: string, email: string, password: string) {
    try {
      const newUser = new this.userModel({
        name,
        email,
        password: await Bcrypt.hash(password, 10),
      });
      const result = await newUser.save();
      console.log(result);
      return result;
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException(
          `Dumplicate ${Object.keys(error.keyValue)} entered`,
        );
      }
      throw error;
    }
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email }).select('+password');
    console.log(user);
    if (!user) throw new ForbiddenException('User not found with this email');

    const isPasswordMatched = await Bcrypt.compare(password, user.password);

    if (!isPasswordMatched) throw new ForbiddenException('Incorrect password');

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

  async findUser(id: string): Promise<User> {
    console.log(id);
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async getSingleUser(userId: string) {
    console.log(userId);
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async signToken(userId: string, email: string): Promise<{access_token:string}> {
    console.log(userId)
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
      access_token:token
    }
    
  }
}
