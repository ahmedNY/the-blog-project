import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('um_module')
export class Module {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    moduleName: string;

    @OneToMany(type => Permission, permission => permission.module)
    permissions: Permission[];
}
