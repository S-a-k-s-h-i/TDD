import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SecurityQuestion } from "./security_question.entity";
import { User } from './user.entity';


@Entity('user_qna') 
export class UserQna extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    security_question_id: string;

    @Column()
    answer: string;

    // Relations Start
    @ManyToOne(() => SecurityQuestion, question => question.userqnas)
    @JoinColumn({
        name: 'security_question_id'
    })
    securityQuestion: SecurityQuestion;  

    @ManyToOne(() => User, user => user.userqnas)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;    
    // Relations End
}