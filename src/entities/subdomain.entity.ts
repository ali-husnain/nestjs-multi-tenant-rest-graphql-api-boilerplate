import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('app_subdomain')
export class Subdomain {
  @PrimaryGeneratedColumn()
  sub_id: number;

  @Column()
  sub_name: string;

  @Column()
  status: string;

  @Column()
  created_on: string;

  @OneToMany(() => User, (user) => user.subdomain)
  users: User[];
}
