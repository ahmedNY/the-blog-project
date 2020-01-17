import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AddUserDTO } from '../dtos/addUser.dto';
import { passwordHash } from '../../lib/password-hash';

@Injectable()
export class AddUserCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    execute(dto: AddUserDTO): any {
        const user = this.userRepository.create(dto);
        user.password = passwordHash(dto.password);
        user.roles = [];
        // save user
        this.userRepository.save(user);
        return { success: true, message: 'User added successfully' };
    }
}
