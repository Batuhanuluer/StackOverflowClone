import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Userdto } from "src/dto/user.dto";
import { LoginUserdto } from "src/dto/loginuser.dto";



@Controller('user')
export class AuthController{
    constructor(private readonly authService : AuthService){}

    @Post('login')
    async login(
        @Body('user') loginUser : LoginUserdto,
        @Res() res,
    ){
        const userToken = await this.authService.login(loginUser)

        if(!userToken){
            throw new HttpException('User not found',HttpStatus.FORBIDDEN)
        }

        res.cookie('token', userToken, { httpsOnly: true });
        res.send(userToken); 
    }


    @Post('register')
    async register(
        @Body('user') createUserdto : Userdto,
    ){
        const createdUser = await this.authService.register(createUserdto);

        if(!createdUser){
            throw new HttpException('Cannot register',HttpStatus.FORBIDDEN)
        }

        return createdUser;
    }

    @Get('/verify/:token')
     async verifyregister(
        @Param() param,
     ){
        const token = param.token;
        const user = await this.authService.verify(token)

        if(!user){
            throw new HttpException('User not found',HttpStatus.FORBIDDEN)
        }

        return user;
     }
}