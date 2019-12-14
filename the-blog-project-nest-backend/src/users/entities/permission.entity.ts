import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm";
import { Role } from "./role.entity";

@Entity("um_permission")
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @Column()
    resource: string;

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];

}
