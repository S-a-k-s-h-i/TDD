import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOfferBid } from './product-offer-bid.entity';

@Entity('product_bid_statuses')
export class ProductBidStatus extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @OneToOne(() => ProductOfferBid, offer => offer.bidStatus)
    offer: ProductOfferBid;
}