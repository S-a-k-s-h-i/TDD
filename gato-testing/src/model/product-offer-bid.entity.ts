import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuyerUser } from "./buyer-user.entity";
import { Product } from "./product.entity";
import { UserRole } from '../constant/enum/user-role/user-role';
import { ProductBidStatus } from "./product-bid-status.entity";

@Entity('product_offer_bids')
export class ProductOfferBid extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    buyer_user_id: number;

    @Column()
    product_bid_status_id: number;

    @Column()
    product_id: number;

    @Column('enum')
    countered_by: UserRole;

    @Column('double precision')
    current_bid_price: number;

    @Column('double precision')
    previous_bid_price: number; 

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => BuyerUser, buyerUser => buyerUser.productOfferBids)
    @JoinColumn({
        name: 'buyer_user_id'
    })
    buyerUser: BuyerUser;

    @ManyToOne(() => Product, product => product.productOfferBids)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;

    @OneToOne(() => ProductBidStatus, bidStatus => bidStatus.offer)
    @JoinColumn({
        name: 'product_bid_status_id'
    })
    bidStatus: ProductBidStatus;
}