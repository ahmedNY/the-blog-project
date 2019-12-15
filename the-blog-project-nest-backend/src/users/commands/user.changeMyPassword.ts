import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AddUserDTO } from '../dtos/addUser.dto';
import * as bcrypt from 'bcryptjs';
import { ChangeMyPasswordDTO } from '../dtos/changeMyPassword.dto';

@Injectable()
export class ChangeMyPasswordCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(dto: ChangeMyPasswordDTO, user: User): Promise<any> {
        const loadedUser = await this.userRepository.findOne(user.id);

        // check user password
        if (!bcrypt.compareSync(dto.oldPassword, loadedUser.password)) {
            return { success: false, message: 'Wrong password provided' };
        }

        // check passwords confirm
        if (dto.newPassword !== dto.newPasswordConfirm) {
            return { success: false, message: 'Passwords not match' };
        }

        // check password complexity
        if (dto.newPassword.length < 6) {
            return { success: false, message: 'Password length must be at least 6 characters' };
        }

        // generate hash in password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(dto.newPassword, salt);
        loadedUser.password = hash;

        // save user
        this.userRepository.save(loadedUser);
        return { success: true, message: 'Your password updated successfully' };
    }
}
