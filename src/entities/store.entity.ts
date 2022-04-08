import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('app_stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alt_name: string;

  @Column()
  sub_id: number;

  @OneToMany(() => User, (user) => user.store)
  users: User[];
}
