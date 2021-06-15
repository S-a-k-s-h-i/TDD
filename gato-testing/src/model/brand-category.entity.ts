import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from './brand.entity';

@Entity('brand_category')
export class BrandCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    brand_id: string;

    @Column()
    category_id: string;

    @ManyToOne(() => Brand, brand => brand.brandCategories)
    @JoinColumn({
        name: 'brand_id'
    })
    brand: Brand;
}