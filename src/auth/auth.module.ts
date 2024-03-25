import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schema/user.schema";
import { EmailSend } from "src/middleware/emailsend.middleware";
import { EmailVerificationSchema } from "src/schema/emailverify.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
    imports : [ MongooseModule.forFeature([{name :'User',schema: UserSchema}]),
                MongooseModule.forFeature([{name : 'EmailVerification', schema :EmailVerificationSchema}]),
                JwtModule.register({
                    secret : 'secretkey',
                    signOptions : {expiresIn : '1h'}
                })],
    controllers :[AuthController],
    providers : [AuthService,EmailSend]
})
export class AuthModule{}