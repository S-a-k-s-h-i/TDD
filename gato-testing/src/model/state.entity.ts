import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BuyerUserAddress } from "./buyer-user-address.entity";
import { Country } from "./country.entity";
import { SellerUser } from "./seller-user.entity";


@Entity('states') 
export class State extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column('char', {
        length: 10
    })
    code: string;

    @Column()
    country_id: string;

    // Relations Start
    @OneToOne(() => SellerUser, seller => seller.state)
    seller: SellerUser;

    @ManyToOne(() => Country, country => country.states)
    @JoinColumn({
        name: 'country_id'
    })
    country: Country;  
    
    @OneToOne(() => BuyerUserAddress, buyerUserAddress => buyerUserAddress.state)
    buyerUserAddress: BuyerUserAddress;
    // Relations End

    @AfterLoad()
    trimCodes() {
        this.code = this.code.trim();
    }
}