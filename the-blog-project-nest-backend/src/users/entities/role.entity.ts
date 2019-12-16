import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('um_role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];

    @ManyToMany(type => Permission, permission => permission.roles)
    @JoinTable({ name: 'um_roles_permissions' })
    permissions: Permission[];
}
