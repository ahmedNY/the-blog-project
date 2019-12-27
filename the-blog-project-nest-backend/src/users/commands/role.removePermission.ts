import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleRemovePermissionDTO } from '../dtos/roleRemovePermission.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRemovePermissionCommand {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(dto: RoleRemovePermissionDTO): Promise<any> {
        const role = await this.roleRepository.findOne(dto.roleId, { relations: ['permissions'] });
        if (!role) {
            return { success: false, message: 'Role not found' };
        }
        const index = role.permissions.findIndex((p) => p.id === dto.permissionId);
        if (index < 0) {
            return { success: false, message: 'Permission not exists in role' };
        }
        delete role.permissions[index];
        this.roleRepository.save(role);
        return { success: true, message: 'Permission removed successfully' };
    }
}
