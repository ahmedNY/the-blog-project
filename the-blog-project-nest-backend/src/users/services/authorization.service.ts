import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class AuthorizationService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async hasPermission(userId: number, action: string, resource: string, tag?: string): Promise<boolean> {
        const count = await this.userRepository.createQueryBuilder('user')
            .innerJoinAndSelect('user.roles', 'role')
            .innerJoinAndSelect('role.permissions', 'permission')
            .where('user.id = :userId', { userId })
            .andWhere('permission.action = :action', { action })
            .andWhere('permission.resource = :resource', { resource })
            .getCount();
        return (count > 0);
    }

    async hasRole(userId: number, role: string, tag?: string): Promise<boolean> {
        const count = await this.userRepository.createQueryBuilder('user')
            .innerJoinAndSelect('user.roles', 'role')
            .where('user.id = :userId', { userId })
            .andWhere('role.roleName = :role', { role })
            .getCount();
        return (count > 0);
    }
}
