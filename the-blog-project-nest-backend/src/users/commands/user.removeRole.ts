import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRemoveRoleDTO } from '../dtos/userRemoveRole.dto';

@Injectable()
export class UserRemoveRoleCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async execute(dto: UserRemoveRoleDTO): Promise<any> {
        const user = await this.userRepository.findOne(dto.userId, { relations: ['roles'] });
        if (!user) {
            return { success: false, message: 'User not found in db' };
        }
        const index = user.roles.findIndex((r) => r.id === dto.roleId);
        if (index < 0) {
            return { success: false, message: 'Role not exists in user' };
        }
        delete user.roles[index];
        this.userRepository.save(user);
        return { success: true, message: 'Role removed successfully' };
    }
}
