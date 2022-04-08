import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_customer')
export class Customer {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  sub_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}
