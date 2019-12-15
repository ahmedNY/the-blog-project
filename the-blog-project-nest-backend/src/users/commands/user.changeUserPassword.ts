import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ChangeUserPasswordDTO } from '../dtos/changeUserPassword.dto';

@Injectable()
export class ChangeUserPasswordCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(dto: ChangeUserPasswordDTO): Promise<any> {
        const user = await this.userRepository.findOne(dto.id);
        // check user exists
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // check passwords confirm
        if (dto.newPassword !== dto.newPasswordConfirm) {
            return { success: false, message: 'Passwords not match' };
        }

        // check password complexity
        if (dto.newPassword.length < 6) {
            return { success: false, message: 'Password length must be atleast 6 characters' };
        }

        // generate hash in password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(dto.newPassword, salt);
        user.password = hash;

        // save user
        this.userRepository.save(user);
        return { success: true, message: 'User\'s passwords updated successfully' };
    }
}
