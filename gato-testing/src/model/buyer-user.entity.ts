import { UserActiveStatus } from "../constant/enum/user-active-status/user-active-status";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { BuyerUserAddress } from './buyer-user-address.entity';
import { BuyerWishlist } from "./buyer-wishlist.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";
import { ProductOfferBid } from "./product-offer-bid.entity";
import { ProductView } from "./product-view.entity";

@Entity('buyer_users') 
export class BuyerUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column('enum')
    active_status: UserActiveStatus;

    @Column()
    profile_image_url: string;

    @Column({
        default: true
    })
    notification_status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @Column({ select: false })
    deleted_at: Date;

    // Relations Start
    @OneToOne(() => User, user => user.buyer)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

    @OneToMany(() => BuyerUserAddress, buyerUserAddress => buyerUserAddress.buyerUser)
    buyerUserAddressses: BuyerUserAddress[];

    @OneToMany(() => BuyerWishlist, buyerWishlist => buyerWishlist.buyerUser)
    wishlists: BuyerWishlist[];

    @OneToMany(() => ProductOfferBid, productOfferBid => productOfferBid.buyerUser)
    productOfferBids: ProductOfferBid[];

    @OneToMany(() => ProductView, productView => productView.buyerUser)
    productViews: ProductView[];

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'buyer_wishlists',
        joinColumn: {
            name: "buyer_user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        }
    })
    wishlistProducts: Product[];

    @OneToOne(() => Order, order => order.buyerUser)
    order: Order;

    @OneToOne(() => Product, product => product.buyerUser)
    product: Product;
    // Relations End

    @BeforeInsert()
    setActiveStatus() {
        this.active_status = UserActiveStatus.ACTIVE
    }
}