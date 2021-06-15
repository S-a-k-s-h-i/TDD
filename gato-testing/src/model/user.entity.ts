import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BuyerUser } from "./buyer-user.entity";
import { SellerUser } from "./seller-user.entity";
import { DeleteDateColumn } from "typeorm";
import { UserQna } from "./user-qna.entity";
import { UserSession } from './user_sessions.entity';
import { UserVerificationToken } from './user-verification-token.entity';
import { UserRole } from "src/constant/enum/user-role/user-role";


@Entity('users') 
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('bool')
    is_buyer: boolean;

    @Column('bool')
    is_seller: boolean;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    country_code: string;

    @Column('bigint')
    phone: number;

    @Column()
    username: string;

    @Column('date')
    dob: Date;

    @Column()
    account_id: string;

    @Column()
    customer_id : string;
    
    @Column()
    is_account_activated : boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;

    // Relations Start
    @OneToOne(() => BuyerUser, buyer => buyer.user)
    buyer: BuyerUser;

    @OneToOne(() => SellerUser, seller => seller.user)
    seller: SellerUser;

    @OneToMany(() => UserQna, userqna => userqna.user)
    userqnas: UserQna[];

    @OneToMany(() => UserSession, session => session.user)
    sessions: UserSession[];

    @OneToOne(() => UserVerificationToken, verificationToken => verificationToken.user)
    verificationToken: UserVerificationToken;
    role: UserRole;
    // Relations End

    // Setter
    @BeforeInsert()
    hashPassword() {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        this.password = bcrypt.hashSync(this.password, salt);
    }

    @BeforeUpdate()
    updatesHashPassword() {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        this.password = bcrypt.hashSync(this.password, salt);
    }
}