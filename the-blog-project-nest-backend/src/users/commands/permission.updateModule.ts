import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdatePermissionDTO } from '../dtos/updatePermission.dto';

@Injectable()
export class UpdatePermissionCommand {
    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async execute(dto: UpdatePermissionDTO): Promise<any> {
        const permission = await this.permissionRepository.findOne(dto.id);
        permission.action = dto.action;
        permission.resource = dto.resource;
        await this.permissionRepository.save(permission);
        return { success: true, message: 'Permission updated successfully' };
    }
}
