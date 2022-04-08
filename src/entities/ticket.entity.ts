import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_ticket_summary')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub_id: number;

  @Column()
  store_id: number;

  @Column()
  order_id: string;

  @Column()
  customer_id: number;

  @Column()
  subtotal: number;

  @Column()
  discount: number;

  @Column()
  total_tax: number;

  @Column()
  total: number;
}
