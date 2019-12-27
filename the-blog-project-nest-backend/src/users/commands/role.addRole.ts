import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AddRoleDTO } from '../dtos/addRole.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AddRoleCommand {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    execute(dto: AddRoleDTO): any {
        // create and validate role
        const role = this.roleRepository.create(dto);
        // save role
        this.roleRepository.save(role);
        return { success: true, message: 'Role added successfully' };
    }
}
