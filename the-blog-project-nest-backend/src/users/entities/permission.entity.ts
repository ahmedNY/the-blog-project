import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Module } from './module.entity';

@Entity('um_permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @Column()
    resource: string;

    @ManyToOne('Module')
    module: Module;

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];

}
