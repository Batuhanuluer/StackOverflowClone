import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


export class Userdto{
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    lastname : string;

    @IsNotEmpty()
    password : string;

    @IsOptional()
    followlist ?: string;
}