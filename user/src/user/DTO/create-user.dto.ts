import { IsAlphanumeric, MaxLength } from "class-validator";


export class CreateuserDTO{

    @IsAlphanumeric()
    @MaxLength(10)
    name:string

    password:string;

    age:number
    
    PhoneNo:number
}