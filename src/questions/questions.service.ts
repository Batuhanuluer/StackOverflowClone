import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestionDto } from "src/dto/question.dto";
import { Question } from "src/schema/question.schema";
import { JwtService } from "@nestjs/jwt";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { User } from "src/schema/user.schema";


@Injectable()
export class QuestionService{
    constructor(@InjectModel(Question.name) private readonly questionModel : Model<Question>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService){}


    async newQuestion(newquestion : QuestionDto, token : string){
        try {
            const user = this.jwtService.decode(token); 
            console.log(user);
            
            const question = new this.questionModel({
                username : user.username,
                userId : user.userId,
                question : newquestion.question,
                commnets : newquestion.commnets,
                like : newquestion.like
            })
            console.log(question);

            await question.save()
            console.log(1);

            return question

        } catch (error) {
            throw new HttpException('Server Error' + error,HttpStatus.BAD_GATEWAY)
        }
    }

    async getQuestion(questionId : string){
        try {

            const question = await this.questionModel.findById(questionId)

            if (!question) {
                throw new HttpException('Question not found' , HttpStatus.NOT_FOUND)
            }

            return question

        } catch (error) {
            throw new HttpException('Server Error' + error,HttpStatus.BAD_GATEWAY)
        }
    }

    async updateQuestion(questionId : string,token: string,updatequestion : QuestionDto){
        try {
            const userAuth = this.jwtService.decode(token); 

            const question = await this.questionModel.findById(questionId)

            if(question.userId !== userAuth.userId){
                throw new HttpException('Auth not found' ,HttpStatus.UNAUTHORIZED)
            }

            question.question = updatequestion.question;
            question.commnets = updatequestion.commnets;
            question.like = updatequestion.like;

            const updatedQuestion = await question.save();

            return updatedQuestion


        } catch (error) {
            throw new HttpException('Server Error' + error,HttpStatus.BAD_GATEWAY)
        }
    }
}