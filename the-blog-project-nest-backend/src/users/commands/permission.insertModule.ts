import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InsertPermissionDTO } from '../dtos/InsertPermission.dto';

@Injectable()
export class InsertPermissionCommand {
    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    execute(dto: InsertPermissionDTO): any {
        // create and validate permission
        const permission = this.permissionRepository.create(dto);
        // save permission
        this.permissionRepository.save(permission);
        return { success: true, message: 'Permission added successfully' };
    }
}
