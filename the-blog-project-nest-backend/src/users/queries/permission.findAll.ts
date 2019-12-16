import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllPermissionsQuery {
    constructor(
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async execute(): Promise<Permission[]> {
        return this.permissionRepository.find({ relations: ['roles', 'module'], order: { id: 'ASC' } });
    }
}
