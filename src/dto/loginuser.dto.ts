import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


export class LoginUserdto{
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    password : string;
}