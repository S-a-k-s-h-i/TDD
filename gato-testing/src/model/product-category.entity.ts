import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_categories')
export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    category_id: string;
}
