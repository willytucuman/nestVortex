import { IsEmail, IsInt, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @MinLength(1)
    @IsString()
    name: string;

    @IsString()
    description: string;
    @IsEmail()
    email: string
    @IsInt()
    edad: number
}
