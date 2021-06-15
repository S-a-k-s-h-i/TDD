import { UserRole } from '../constant/enum/user-role/user-role';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order_ratings')
export class OrderRating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    rated_by_user: string;

    @Column('enum')
    rated_by_role: UserRole;
    
    @Column()
    rated_to_user: string;

    @Column()
    order_id: string;
    
    @Column()
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}
 