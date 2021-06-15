import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ShippingMethod } from './shipping-method.entity';

@Entity('product_shipping_method')
export class ProductShippingMethod extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    shipping_method_id: string;

    @ManyToOne(() => Product, product => product.productShippingMethods)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;

    @ManyToOne(() => ShippingMethod, shippingMethod => shippingMethod.productShippingMethods)
    @JoinColumn({
        name: 'shipping_method_id'
    })
    shippingMethod: ShippingMethod;

    
}
