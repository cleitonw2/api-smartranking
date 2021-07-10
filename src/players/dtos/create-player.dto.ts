import { IsEmail, IsNotEmpty } from "class-validator";


export class CreatePlayerDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;
}