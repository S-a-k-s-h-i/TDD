import { TaxType } from '../constant/enum/tax-type/text-type';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('taxes')
export class Tax extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    country_id: string;

    @Column()
    state_id: string;

    @Column('enum')
    tax_type: TaxType;

    @Column()
    tax_value: number;

    @OneToOne(() => Order, order => order.tax)
    order: Order;
}