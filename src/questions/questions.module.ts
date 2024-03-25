import { Module } from "@nestjs/common";
import { QuestionService } from "./questions.service";
import { QuestionController } from "./questions.controller";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionSchema } from "src/schema/question.schema";
import { JwtModule } from "@nestjs/jwt";
import { UserSchema } from "src/schema/user.schema";




@Module({
    imports : [MongooseModule.forFeature([{name : 'Question', schema : QuestionSchema}]),
    MongooseModule.forFeature([{name : 'User', schema : UserSchema}]),
    JwtModule.register({
        secret : 'secretkey',
        signOptions : {expiresIn : '1h'}
    })
],
    controllers : [QuestionController],
    providers : [QuestionService]
})
export class QuestionModule{
    
}