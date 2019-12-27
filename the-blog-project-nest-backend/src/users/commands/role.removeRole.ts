import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AddRoleDTO } from '../dtos/addRole.dto';
import * as bcrypt from 'bcryptjs';
import { RemoveRoleDTO } from '../dtos/removeRole.dto';

@Injectable()
export class RemoveRoleCommand {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(dto: RemoveRoleDTO): Promise<any> {
        const role = await this.roleRepository.findOne(dto.roleId);
        // save role
        await this.roleRepository.delete(role);
        return { success: true, message: 'Role removed successfully' };
    }
}
