import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuyerUser } from "./buyer-user.entity";
import { Product } from "./product.entity";

@Entity('product_views')
export class ProductView extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    buyer_user_id: number;

    @Column()
    product_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => BuyerUser, buyerUser => buyerUser.productViews)
    @JoinColumn({
        name: 'buyer_user_id'
    })
    buyerUser: BuyerUser;

    @ManyToOne(() => Product, product => product.productViews)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;
}