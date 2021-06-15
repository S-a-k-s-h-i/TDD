
import { BaseEntity, Column, Entity, JoinColumn,  ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { ProductMetadataMap } from './product-metadata-map.entity';
import { Metadata } from './metadata.entity';


@Entity('product_metadata')
export class ProductMetadata extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_type_id: string;

    @Column()
    metadata_id: string;

    @Column()
    is_active: boolean;

    @ManyToOne(() => Metadata, metadata => metadata.productMetadatas)
    @JoinColumn({
        name: 'metadata_id'
    })
    metadataDetail: Metadata;

    @OneToMany(() => ProductMetadataMap, metadataMap => metadataMap.productMetadata)
    productMetadataMaps: ProductMetadataMap[];
}

