import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserQnaDto {
    @IsNotEmpty()
    @IsNumber()
    security_question_id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    answer: string
    
}