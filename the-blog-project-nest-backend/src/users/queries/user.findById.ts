import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByIdQuery {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(userId: number): Promise<User> {
        return this.userRepository.findOne(userId);
    }
}
