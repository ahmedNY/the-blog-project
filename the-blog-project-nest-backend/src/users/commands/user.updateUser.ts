import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/updateUser.dto';

@Injectable()
export class UpdateUserCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(dto: UpdateUserDTO): Promise<any> {
        const user = await this.userRepository.findOne(dto.id);
        user.displayName = dto.displayName;
        this.userRepository.save(user);
        return { success: true, message: 'User Updated successfully' };
    }
}
