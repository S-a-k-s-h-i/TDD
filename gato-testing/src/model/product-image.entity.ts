import { ImageType } from '../constant/enum/image-type/image-type';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    product_id: string;

    @Column()
    image_url: string;

    @Column()
    image_type: ImageType;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({
        name: 'product_id'
    })
    product: Product;
}
