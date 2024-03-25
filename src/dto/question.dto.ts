import {IsNotEmpty, IsOptional } from "class-validator";


export class QuestionDto{
    @IsNotEmpty()
    question : string;

    @IsOptional()
    commnets ?: [{commentusername :string, comment : string}];

    @IsOptional()
    like ?: [string]
}