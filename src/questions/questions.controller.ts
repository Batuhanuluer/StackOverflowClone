import { Body, Controller,HttpException,HttpStatus,Param,Post, Req,Get, Patch } from "@nestjs/common";
import { QuestionService } from "./questions.service";
import { QuestionDto } from "src/dto/question.dto";




@Controller('question')
export class QuestionController{
    constructor(private readonly questionService : QuestionService){}


    @Post('ask') 
    newQuestion(
        @Req() req,
        @Body('question') question : QuestionDto
    ){
        const token = req.cookies['token'];
        console.log(2);

        if(!token){
            throw new HttpException('User not found', HttpStatus.FAILED_DEPENDENCY);
        }


        return this.questionService.newQuestion(question,token)
        
    }

    @Get(':id')
    getQuestion(
        @Param() param,
    ){
         
        const question = this.questionService.getQuestion(param.id)

        return question
    }

    
    @Patch(':id')
    updateQuestion(
        @Param() Param,
        @Req() req,
        @Body('question') question : QuestionDto
    ){
        const token = req.cookies['token'];

        const questionId = Param.id

        return this.questionService.updateQuestion(questionId,token,question);

    }
}