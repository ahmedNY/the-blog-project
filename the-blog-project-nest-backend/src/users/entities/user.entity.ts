import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';

@Entity('um_user')
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    displayName: string;

    @Column()
    mobileNumber: string;

    @Column('text')
    password: string;

    @ManyToMany(type => Role, role => role.users)
    @JoinTable({ name: 'um_user_roles' })
    roles: Role[];

    @CreateDateColumn()
    createdAt: Date;
}
