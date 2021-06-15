import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './attribute.entity';
import { ProductAttributeMap } from './product-attribute-map.entity';
import { ProductAttribute } from './product-attribute.entity';

@Entity('product_attribute_values')
export class ProductAttributeValue extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    attribute_id: string;

    @Column()
    value: string;

    @Column()
    is_active: boolean;

    @ManyToOne(() => Attribute, attribute => attribute.attributeValues)
    @JoinColumn({
        name: 'attribute_id'
    })
    attribute: ProductAttribute;

    @OneToMany(() => ProductAttributeMap, attributeMap => attributeMap.values)
    attributeMaps: ProductAttributeMap[];
}
