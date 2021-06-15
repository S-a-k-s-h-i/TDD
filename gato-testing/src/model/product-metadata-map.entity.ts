import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductMetadata } from './product-metadata.entity';

@Entity('product_metadata_map')
export class ProductMetadataMap extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    product_metadata_id: string;

    @Column()
    value: string;

    @ManyToOne(() => Product, product => product.productMetadatas)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;

    @ManyToOne(() => ProductMetadata, productMetadata => productMetadata.productMetadataMaps)
    @JoinColumn({
        name: 'product_metadata_id'
    })
    productMetadata: ProductMetadata;
    
}
 