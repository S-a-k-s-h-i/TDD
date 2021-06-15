import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProductShippingMethod } from './product-shipping-method.entity';
@Entity('shipping_methods')
export class ShippingMethod extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    is_active: boolean;

    @OneToMany(() => ProductShippingMethod, productShippingmethod => productShippingmethod.shippingMethod)
    productShippingMethods: ProductShippingMethod[];

    @OneToOne(() => Order, order => order.shippingMethod)
    order: Order;

}
