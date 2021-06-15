import { UserActiveStatus } from "../constant/enum/user-active-status/user-active-status";
import { AfterLoad, BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Country } from "./country.entity";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { State } from "./state.entity";
import { User } from "./user.entity";


@Entity('seller_users') 
export class SellerUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column('enum')
    active_status: UserActiveStatus;

    @Column()
    profile_image_url: string;

    @Column('varchar')
    google_place_id: string;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;

    @Column()
    address_line_1: string;

    @Column()
    address_line_2: string;

    @Column()
    landmark: string;

    @Column()
    country_id: string;

    @Column()
    state_id: string;

    @Column()
    city: string;

    @Column()
    zipcode: string;

    @Column()
    bank_account: string;

    @Column({
        default: true
    })
    notification_status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @Column({ select: false })
    deleted_at: Date;

    // Relations Start
    @OneToOne(() => User, user => user.seller)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

    @OneToOne(() => Country, country => country.seller)
    @JoinColumn({
        name: 'country_id'
    })
    country: Country;

    @OneToOne(() => State, state => state.seller)
    @JoinColumn({
        name: 'state_id'
    })
    state: State;

    @OneToMany(() => Product, product => product.sellerUser)
    products: Product[];

    @OneToOne(() => Order, order => order.sellerUser)
    order: Order;
    
    formattedAddress: string;
    // Relations End

    @BeforeInsert()
    setActiveStatus() {
        this.active_status = UserActiveStatus.ACTIVE
    }

    @AfterLoad()
    formatAddress() {
        const addressLine2 = (this.address_line_2) ? ' '+ this.address_line_2+' ' : ' ';
        const stateCode = (this.state) ? ' '+this.state.code.trim()+' ' : ' ';
        const countryName = (this.country) ?  this.country.name+' ' : ' ';
        this.formattedAddress = this.address_line_1 + addressLine2 + this.city+ stateCode + countryName + this.zipcode;
    }
}