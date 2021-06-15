import { AfterLoad, BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BuyerUserAddress } from "./buyer-user-address.entity";
import { SellerUser } from "./seller-user.entity";
import { State } from "./state.entity";

@Entity('countries')
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    // Relations Start
    @OneToOne(() => SellerUser, seller => seller.country)
    seller: SellerUser;

    @OneToMany(() => State, states => states.country)
    states: State[];

    @OneToOne(() => BuyerUserAddress, buyerUserAddress => buyerUserAddress.country)
    buyerUserAddress: BuyerUserAddress;
    // Relations End

    @AfterLoad()
    trimCodes() {
        this.code = this.code.trim();
    }
}