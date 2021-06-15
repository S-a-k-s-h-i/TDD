import { AddressType } from '../constant/enum/address-type/address-type';
import { AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BuyerUser } from './buyer-user.entity';
import { Country } from './country.entity';
import { State } from './state.entity';

@Entity('buyer_user_addresses')
export class BuyerUserAddress {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    buyer_user_id: string;

    @Column()
    address_type: AddressType;

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
    is_default: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @Column({ select: false })
    deleted_at: Date;

    @ManyToOne(() => BuyerUser, buyerUser => buyerUser.buyerUserAddressses)
    @JoinColumn({
        name: 'buyer_user_id'
    })
    buyerUser: BuyerUser;

    @OneToOne(() => Country, country => country.buyerUserAddress)
    @JoinColumn({
        name: 'country_id'
    })
    country: Country;

    @OneToOne(() => State, state => state.buyerUserAddress)
    @JoinColumn({
        name: 'state_id'
    })
    state: State;
    formattedAddress: string;
    
    @AfterLoad()
    formatAddress() {
        const addressLine2 = (this.address_line_2) ? ' '+ this.address_line_2+' ' : ' ';
        this.formattedAddress = this.address_line_1 + addressLine2 + this.city+' '+this.state.code.trim()+' '+this.country.name+' '+ this.zipcode;
    }
}