import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RemovePermissionDTO } from '../dtos/removePermission.dto';

@Injectable()
export class RemovePermissionCommand {
    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async execute(dto: RemovePermissionDTO): Promise<any> {
        const permission = await this.permissionRepository.findOne(dto.permissionId);
        // save permission
        await this.permissionRepository.delete(permission);
        return { success: true, message: 'Permission removed successfully' };
    }
}
