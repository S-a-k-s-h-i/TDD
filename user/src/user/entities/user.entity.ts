import { isNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usersData")
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    password:string;

    @Column()
    age:number;

    @Column()
    PhoneNo:number;
}