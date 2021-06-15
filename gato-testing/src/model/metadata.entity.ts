import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductMetadata } from './product-metadata.entity';
import { ProductType } from './product-type.entity';

@Entity('metadatas')
export class Metadata extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    metadata: string;

    @Column()
    type: string;
    
    @ManyToMany(() => ProductType, productTypes => productTypes.metadatas)
    productTypes: ProductType[];

    @OneToMany(() => ProductMetadata, productMetadata => productMetadata.metadataDetail)
    productMetadatas: ProductMetadata[];
}
