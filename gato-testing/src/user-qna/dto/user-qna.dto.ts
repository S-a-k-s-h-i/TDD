import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserQnaDto {
    @IsNotEmpty()
    @IsNumber()
    security_question_id: number;

    @IsNotEmpty()
    @IsString()
    answer: string

    @IsOptional()
    @IsNumber()
    id: number;
    
}