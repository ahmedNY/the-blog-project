import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class Role_FindById {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(roleId: number): Promise<Role> {
        const role = await this.roleRepository.findOne(roleId, { relations: ['users', 'permissions', 'permissions.module'] });
        return role;
    }
}
