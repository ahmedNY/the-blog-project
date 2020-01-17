import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';

const permissionUrlWithTagRegex = /(.*):(.*)@(.*)/i;
const permissionUrlRegex = /(.*):(.*)/i;
const roleUrlWithTagRegex = /(.*)@(.*)/i;

@Injectable()
export class AuthorizationService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) { }

    async checkUserPermission(userId: number, url: string): Promise<boolean> {
        const withTagRegexResults = permissionUrlWithTagRegex.exec(url);
        if (withTagRegexResults) {
            const [, action, resource, tag] = withTagRegexResults;
            return this.hasPermission(userId, action, resource, tag);
        }
        const urlRegexResults = permissionUrlRegex.exec(url);
        if (urlRegexResults) {
            const [, action, resource] = urlRegexResults;
            return this.hasPermission(userId, action, resource);
        }
        console.log(`checkUserPermission() could not process permission url: ${url}, returning true`);
        return true;
    }
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
    async checkUserRole(userId: number, url: string): Promise<boolean> {
        const withTagResults = roleUrlWithTagRegex.exec(url);
        if (withTagResults) {
            const [, role, tag] = withTagResults;
            return this.hasRole(userId, role, tag);
        } else {
            return this.hasRole(userId, url);
        }
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
