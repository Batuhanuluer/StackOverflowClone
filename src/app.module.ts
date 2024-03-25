import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './questions/questions.module';
import * as dotenv from 'dotenv';

dotenv.config(); // dotenv modülünü kullanarak .env dosyasını yükle

const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;

@Module({
  imports: [
    AuthModule,
    QuestionModule,
    MongooseModule.forRoot(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ecrv26d.mongodb.net/? 
    retryWrites=true&w=majority&appName=Cluster0`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
