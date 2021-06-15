import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserQna } from "./user-qna.entity";

@Entity('security_questions')
export class SecurityQuestion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    question: string;

    // Relations Start
    @OneToMany(() => UserQna, userqna => userqna.securityQuestion)
    userqnas: UserQna[];
    // Relations End
}