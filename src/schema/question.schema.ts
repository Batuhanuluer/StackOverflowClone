import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type QuestionDocument = HydratedDocument<Question>

@Schema()
export class Question {
    @Prop({required:true})
    username : string;

    @Prop({required:true})
    userId : string;

    @Prop({required:true})
    question : string;

    @Prop({required:false})
    commnets ?: [{commentusername :string, comment : string}];

    @Prop({required:false})
    like ?: [string]
}

export const QuestionSchema = SchemaFactory.createForClass(Question)