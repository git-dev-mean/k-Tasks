import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    TaskModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.ddwli.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
