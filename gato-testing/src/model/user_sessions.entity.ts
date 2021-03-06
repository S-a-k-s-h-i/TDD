import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('user_sessions') 
export class UserSession extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    auth_token: string;

    @Column()
    refresh_token: string;

    @Column()
    fcm_token: string;

    @Column()
    device_id: string;

    @CreateDateColumn({ select: false })
    created_at: Date;

    @CreateDateColumn({ select: false })
    updated_at: Date;

    // Relations Start
    @ManyToOne(() => User, user => user.sessions)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;   
    // Relations End
}