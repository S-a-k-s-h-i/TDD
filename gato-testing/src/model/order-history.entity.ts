import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order_histories')
export class OrderHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    order_status_id: string;

    @Column()
    order_id: string;

    @Column()
    shipment_tracking_id: string;

    @Column()
    shipping_partner_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}