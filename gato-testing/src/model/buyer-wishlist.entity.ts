import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuyerUser } from './buyer-user.entity';
import { Product } from "./product.entity";

@Entity('buyer_wishlists')
export class BuyerWishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_id: number;

    @Column()
    buyer_user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @ManyToOne(() => BuyerUser, buyerUser => buyerUser.wishlists)
    @JoinColumn({
        name: 'buyer_user_id'
    })
    buyerUser: BuyerUser;

    @ManyToOne(() => Product, product => product.wishlists)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;
}