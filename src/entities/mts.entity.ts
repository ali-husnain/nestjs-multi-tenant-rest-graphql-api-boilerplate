import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_subdomain_mts_connections')
export class Mts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub_id: number;

  @Column()
  domain_name: string;

  @Column()
  domain_db: string;
}
