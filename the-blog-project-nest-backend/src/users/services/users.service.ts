import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../dawak/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async findOne(mobileNumber: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { mobileNumber },
            relations: ['roles', 'roles.permissions'],
        });
    }

    async findUserWithRolesAndPermissions(mobileNumber: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { mobileNumber },
            relations: ['roles', 'roles.permissions', 'roles.permissions.module'],
        });

    }
}
