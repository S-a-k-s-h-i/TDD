import { ShippingPartnerTrackingType } from '../constant/enum/tracking-type/tracking-type';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('shipping_partners')
export class ShippingPartner extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    api_available: number;

    @Column('enum')
    tracking_type: ShippingPartnerTrackingType;

    @OneToOne(() => Order, order => order.shippingPartner)
    order: Order;
    
}
