import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductType } from './product-type.entity';

@Entity('attributes')
export class Attribute extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    attribute: string;

    @Column()
    code: string;

    @ManyToMany(() => ProductType, productType => productType.attributes)
    productTypes: ProductType[];

    @OneToMany(() => ProductAttribute, productAttribute => productAttribute.attribute)
    productAttributes: ProductAttribute[];

    @OneToMany(() => ProductAttributeValue, productAttribute => productAttribute.attribute)
    attributeValues: ProductAttributeValue[];

}
