import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class User_FindAll {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(): Promise<User[]> {
        return this.userRepository.find();
    }
}
