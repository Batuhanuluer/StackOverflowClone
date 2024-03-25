import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Userdto } from "src/dto/user.dto";
import { User } from "src/schema/user.schema";
import * as bcrypt from "bcrypt"
import { RandomToken } from "src/middleware/randomtoken.middleware";
import { EmailVerification } from "src/schema/emailverify.schema";
import { EmailSend } from "src/middleware/emailsend.middleware";
import { LoginUserdto } from "src/dto/loginuser.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
                @InjectModel(EmailVerification.name) private readonly emailverificationmodel : Model<EmailVerification>,
                private readonly emailsender : EmailSend ,
                private readonly jwtService: JwtService,
    ){}


    async login(loginUser : LoginUserdto){
        try {
            const user = await this.userModel.findOne({email:loginUser.email})            
            

            if (!user || !(await bcrypt.compare(loginUser.password, user.password))) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            const token = this.jwtService.sign({ username: user.name, userId: user._id }); 

            return token

        } catch (error) {
            throw new HttpException('Server Error',HttpStatus.BAD_GATEWAY)
        }
    }

    async register(newUser : Userdto){
        try {
            const hashedPassowrd  = await bcrypt.hash(newUser.password,12)
            
            const createdUser = new this.userModel({
                email : newUser.email,
                name : newUser.name,
                lastname : newUser.lastname,
                password : hashedPassowrd
            })

            const verificationToken = RandomToken.generateRandomToken(10);

            const emailVerify = new this.emailverificationmodel({
                email : newUser.email,
                token : verificationToken,
            })
            console.log(emailVerify);
            
            await this.emailsender.sendVerificationEmail(newUser.email,verificationToken)

            await emailVerify.save()

            await createdUser.save()

            return createdUser

        } catch (error) {
            throw new HttpException('Server Error',HttpStatus.BAD_GATEWAY)
        }
    }

    async verify(tokenNew : string){
        try {

            const verifyUser = await this.emailverificationmodel.findOne({token : tokenNew})


            await this.userModel.findOneAndUpdate({email:verifyUser.email},{isEmailVerified:true})

            await verifyUser.deleteOne()

            return verifyUser

        } catch (error) {
            throw new HttpException('Server Error',HttpStatus.BAD_GATEWAY)
        }
    }
}