import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EmailVerificationDocument = HydratedDocument<EmailVerification>

@Schema()
export class EmailVerification {

    @Prop({required:true})
    email : string;

    @Prop({required:true})
    token : string;
}

export const EmailVerificationSchema = SchemaFactory.createForClass(EmailVerification)