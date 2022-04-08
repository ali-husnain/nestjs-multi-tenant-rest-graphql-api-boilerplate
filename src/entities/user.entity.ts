import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Store } from './store.entity';
import { Subdomain } from './subdomain.entity';

@Entity('app_user')
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  store_id: number;

  @Column()
  sub_id: number;

  @Column()
  is_delete: number;

  @ManyToOne(() => Store, (store) => store.users)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToOne(() => Subdomain, (subdomain) => subdomain.users)
  @JoinColumn({ name: 'sub_id' })
  subdomain: Subdomain;
}
