import { Length, MaxLength } from "class-validator"

export class UpdateUserDTO{
    age?:number
    
    PhoneNo?:number

    password?:string;
}