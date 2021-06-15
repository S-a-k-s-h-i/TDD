import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './user.entity';

@Entity("user_verification_tokens")
export class UserVerificationToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    otp: number;

    @Column("varchar")
    email_reset_token: string;

    @Column({ type: "timestamp without time zone" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp without time zone" })
    updated_at: Date;

    //Relation Start
    @OneToOne(() => User, user => user.verificationToken)
    user: User
    //Relation End
}

