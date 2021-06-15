import { AfterLoad, BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from './product.entity';
import { OrderStatus } from './order-status.entity';
import { ShippingMethod } from "./shipping-method.entity";
import { BuyerUser } from './buyer-user.entity';
import { SellerUser } from "./seller-user.entity";
import { CancelByRole } from "../constant/enum/cancel-by/cancel-by";
import { ShippingPartner } from "./shipping-partner.entity";
import { Tax } from "./tax.entity";

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Generated('increment')
    order_number: number;

    @Column()
    buyer_user_id: string;

    @Column()
    shipping_method_id: string;

    @Column()
    buyer_user_address_id: string;

    @Column()
    order_status_id: string;

    @Column()
    seller_user_id: string;

    @Column()
    shipping_partner_id: string;

    @Column()
    shipment_tracking_id: string;

    @Column()
    payment_method_id: string;

    @Column()
    payment_gateway_id: string;

    @Column()
    payment_status_id: string;

    @Column('json',{
        array: true
    })
    payment_method_token: any;

    @Column()
    tax_id: string;

    @Column()
    tax_value: number;

    @Column()
    payment_id: string;

    @Column()
    order_cancel_reason: string;

    @Column()
    shipping_cost: number;

    @Column()
    product_total: number;

    @Column()
    is_refund_fee_charged: number;

    @Column()
    delivery_date: Date;

    @Column()
    completed_date: Date;

    @Column()
    canceled_date: Date;

    @Column()
    canceled_by: CancelByRole;

    @Column({
        default: false
    })
    is_payout_done: boolean;
    
    @Column({
        default: false
    })
    is_refund_done: boolean;

    @Column()
    payout_failure_status: string;

    @Column()
    refund_failure_status: string;

    @Column()
    shipping_date: Date;

    @Column()
    payout_id: string;

    @Column()
    refund_id: string;

    @Column()
    shipment_id: string;

    @Column('json')
    rate: string;
    
    @Column()
    label_url: string;

    @Column()
    easy_post_tracking_code: string;

    @Column({
        default: false
    })
    is_offer_accepted: boolean;
 
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'order_products',
        joinColumn: {
            name: "order_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        }
    })
    products: Product;

    @OneToOne(() => OrderStatus, orderStatus => orderStatus.order)
    @JoinColumn({
        name: 'order_status_id'
    })
    orderStatus: OrderStatus;

    @OneToOne(() => ShippingMethod, shippingMethod => shippingMethod.order)
    @JoinColumn({
        name: 'shipping_method_id'
    })
    shippingMethod: ShippingMethod;

    @OneToOne(() => BuyerUser, buyerUser => buyerUser.order)
    @JoinColumn({
        name: 'buyer_user_id'
    })
    buyerUser: BuyerUser;

    @OneToOne(() => SellerUser, sellerUser => sellerUser.order)
    @JoinColumn({
        name: 'seller_user_id'
    })
    sellerUser: SellerUser;

    @OneToOne(() => ShippingPartner, shippingPartner => shippingPartner.order)
    @JoinColumn({
        name: 'shipping_partner_id'
    })
    shippingPartner: ShippingPartner;

    @OneToOne(() => Tax, tax => tax.order)
    @JoinColumn({
        name: 'tax_id'
    })
    tax: Tax;

    formatted_order_number: string;

    // Format order number when it is loaded
    @AfterLoad()
    formatOrderNumber() {
        let orderPrefix = 'GTO';
        while(orderPrefix.length < 11) orderPrefix += '0';
        this.formatted_order_number = orderPrefix + this.order_number;
    }

}