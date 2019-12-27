import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleAddPermissionDTO } from '../dtos/roleAddPermission.dto';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class RoleAddPermissionCommand {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async execute(dto: RoleAddPermissionDTO): Promise<any> {
        const role = await this.roleRepository.findOne(dto.roleId, { relations: ['permissions'] });
        const permissionIndex = role.permissions.findIndex(r => r.id === dto.roleId);
        if (permissionIndex >= 0) {
            return { success: false, message: 'Permission already exists in role' };
        }
        const permission = await this.permissionRepository.findOne(dto.permissionId);
        if (!permission) {
            return { success: false, message: 'Permission not found in db' };
        }
        role.permissions.push(permission);
        this.roleRepository.save(role);
        return { success: true, message: 'Permission added to role successfully' };
    }
}
