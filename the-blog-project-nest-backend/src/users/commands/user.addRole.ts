import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAddRoleDTO } from '../dtos/userAddRole.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserAddRoleCommand {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(dto: UserAddRoleDTO): Promise<any> {
        const user = await this.userRepository.findOne(dto.userId, { relations: ['roles'] });
        const roleIndex = user.roles.findIndex(r => r.id === dto.roleId);
        if (roleIndex >= 0) {
            return { success: false, message: 'Role already exists in user' };
        }
        const role = await this.roleRepository.findOne(dto.roleId);
        if (!role) {
            return { success: false, message: 'Role not found' };
        }
        user.roles.push(role);
        await this.userRepository.save(user);
        return { success: true, message: 'Role added successfully' };
    }
}
