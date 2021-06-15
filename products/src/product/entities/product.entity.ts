import { BaseEntity } from "typeorm";

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;
}
