import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AddRoleDTO } from '../dtos/addRole.dto';
import * as bcrypt from 'bcryptjs';
import { RemoveRoleDTO } from '../dtos/removeRole.dto';
import { UpdateRoleDTO } from '../dtos/updateRole.dto';

@Injectable()
export class UpdateRoleCommand {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(dto: UpdateRoleDTO): Promise<any> {
        const role = await this.roleRepository.findOne(dto.roleId);
        role.roleName = dto.roleName;
        await this.roleRepository.save(role);
        return { success: true, message: 'Role updated successfully' };
    }
}
