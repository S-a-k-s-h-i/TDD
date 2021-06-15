import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_products')
export class OrderProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    order_id: string;

    @Column()
    product_id: string;

    @Column()
    quantity: number;

    @Column()
    single_price: number;

    @Column()
    total_price: number;
}