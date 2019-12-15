import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LoginUserDTO } from '../dtos/loginUser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUserCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(dto: LoginUserDTO): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                mobileNumber: dto.mobileNumber,
            },
        });

        // check user exists
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        // check user password
        if (!bcrypt.compareSync(dto.password, user.password)) {
            throw new Error('INCORRECT_PASSWORD');
        }

        return { success: true, message: 'User logged in successfully' };
    }
}
