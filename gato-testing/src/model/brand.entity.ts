import { BrandGroup } from '../constant/enum/brand-group/brand-group';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { BrandCategory } from './brand-category.entity';

@Entity('brands')
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    is_active: boolean;

    @Column()
    brand_group: BrandGroup;    

    @OneToMany(() => Product, product => product.sellerUser)
    products: Product[];

    @ManyToMany(() => Category, category => category.brands)
    @JoinTable({
        name: 'brand_category',
        joinColumn: {
            name: "brand_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[];

    @OneToMany(() => BrandCategory, brandCategory => brandCategory.brand)
    brandCategories: BrandCategory[];
}
