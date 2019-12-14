import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity("um_user")
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    displayName: string;

    @Column()
    mobileNumber: string;

    @Column("text")
    password: string;

    @Column("json")
    roles: Role[];

    @CreateDateColumn()
    createdAt: Date;
}