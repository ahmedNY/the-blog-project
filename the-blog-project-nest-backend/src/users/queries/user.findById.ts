import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class User_FindById {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(userId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId, { relations: ['roles', 'roles.permissions', 'roles.permissions.module'] });
        delete user.password;
        return user;
    }
}
