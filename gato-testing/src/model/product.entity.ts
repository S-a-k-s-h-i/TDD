import { ProductStatus } from '../constant/enum/product-status/product-status';
import { AfterLoad, BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductType } from './product-type.entity';
import { SellerUser } from './seller-user.entity';
import { Brand } from './brand.entity';
import { ProductImage } from './product-image.entity';
import { ProductAttributeMap } from './product-attribute-map.entity';
import { ShippingMethod } from './shipping-method.entity';
import { Category } from './category.entity';
import { ProductMetadata } from './product-metadata.entity';
import { ProductMetadataMap } from './product-metadata-map.entity';
import { ProductShippingMethod } from './product-shipping-method.entity';
import { BuyerWishlist } from './buyer-wishlist.entity';
import { ProductOfferBid } from './product-offer-bid.entity';
import { BuyerUser } from './buyer-user.entity';
import { HoldCancelStatus } from '../constant/enum/hold-cancel-status/hold-cancel-status';
import { ProductView } from './product-view.entity';

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_type_id: string;

    @Column()
    seller_user_id: string;

    @Column()
    brand_id: string;

    @Column()
    product_id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    weight: number;

    @Column()
    length: number;

    @Column()
    breadth: number;

    @Column()
    height: number;

    @Column()
    description: string;

    @Column()
    product_status: ProductStatus;

    @Column('double precision')
    selling_price: number;

    @Column('double precision')
    display_price: number;

    @Column('double precision')
    shipping_cost: number;

    @Column()
    open_to_offer: boolean;

    @Column('double precision')
    bid_base_price: number;

    @Column()
    auto_reject: boolean;

    @Column()
    deactivation_date: Date;

    @Column()
    reactivation_date: Date;

    @Column()
    is_hold_required: boolean;

    @Column()
    hold_expire_date: Date;

    @Column()
    hold_by_buyer: number;

    @Column()
    hold_payment_id: string;

    @Column()
    hold_cancel_status: HoldCancelStatus;

    @Column({
        default: false
    })
    easy_post_opt_status: boolean;

    @Column()
    is_hold_payout_done: boolean;

    @Column()
    is_hold_refund_done: boolean;

    @Column()
    hold_refund_id: string;

    @Column()
    hold_payout_failure_reason: string;

    @Column()
    hold_refund_failure_reason: string;

    @Column()
    hold_payout_id: string;

    @Column()
    hold_amount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;

    @ManyToOne(() => ProductType, productType => productType.products)
    @JoinColumn({
        name: 'product_type_id'
    })
    productType: ProductType;

    @ManyToOne(() => SellerUser, sellerUser => sellerUser.products)
    @JoinColumn({
        name: 'seller_user_id'
    })
    sellerUser: SellerUser;

    @ManyToOne(() => Brand, brand => brand.products)
    @JoinColumn({
        name: 'brand_id'
    })
    brand: Brand;

    @OneToMany(() => ProductImage, image => image.product, { cascade: true })
    images: ProductImage[];

    @OneToMany(() => ProductShippingMethod, productShippingMethod => productShippingMethod.product, { cascade: true })
    productShippingMethods: ProductShippingMethod[];

    @ManyToMany(() => ShippingMethod)
    @JoinTable({
        name: 'product_shipping_method',
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "shipping_method_id",
            referencedColumnName: "id"
        }
    })
    shippingMethods: ShippingMethod[];

    @ManyToMany(() => Category, { cascade: true })
    @JoinTable({
        name: 'product_categories',
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[];

    @ManyToMany(() => ProductMetadata, { cascade: true })
    @JoinTable({
        name: 'product_metadata_map',
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product_metadata_id",
            referencedColumnName: "id"
        }
    })
    metadatas: ProductMetadata[];

    @OneToMany(() => ProductMetadataMap, productMetadata => productMetadata.product)
    productMetadatas: ProductMetadataMap[];

    @OneToMany(() => ProductAttributeMap, attributeMap => attributeMap.product)
    attributeMaps: ProductAttributeMap[];

    @OneToMany(() => BuyerWishlist, buyerWishlist => buyerWishlist.product)
    wishlists: BuyerWishlist[];
    is_wishlisted: boolean;
    seller_rating: number;

    @OneToMany(() => ProductOfferBid, productOfferBid => productOfferBid.product)
    productOfferBids: ProductOfferBid[];

    @OneToMany(() => ProductView, productView => productView.product)
    productViews: ProductView[];

    @OneToOne(() => BuyerUser, buyerUser => buyerUser.product)
    @JoinColumn({
        name: 'hold_by_buyer'
    })
    buyerUser: BuyerUser;
    length_feet: number;
    length_inch: number;
    breadth_feet: number;
    breadth_inch: number;
    height_feet: number;
    height_inch: number;
    weight_feet: number;
    weight_inch: number;

    @AfterLoad()
    formatDimensions() {
        if(this.length) {
            const length = this.length.toString().split('.');
            this.length_feet = (length[0]) ? +length[0] : 0;
            this.length_inch = (length[1]) ? +length[1] : 0;
        }
        if(this.breadth) {
            const breadth = this.breadth.toString().split('.');
            this.breadth_feet = (breadth[0]) ? +breadth[0] : 0;
            this.breadth_inch = (breadth[1]) ? +breadth[1] : 0;
        }
        if(this.height) {
            const height = this.height.toString().split('.');
            this.height_feet = (height[0]) ? +height[0] : 0;
            this.height_inch = (height[1]) ? +height[1] : 0;
        }
        if(this.weight) {
            const weight = this.weight.toString().split('.');
            this.weight_feet = (weight[0]) ? +weight[0] : 0;
            this.weight_inch = (weight[1]) ? +weight[1] : 0;
        }
    }

}
