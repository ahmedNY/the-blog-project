import { Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    body: string;

    @Column('json')
    images: string[];

    @ManyToOne('User')
    createdBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne('User')
    updatedBy: User;

    @UpdateDateColumn()
    updateAt: Date;
}
