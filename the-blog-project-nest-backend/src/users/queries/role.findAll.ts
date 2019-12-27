import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class Role_FindAll {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async execute(): Promise<Role[]> {
        return this.roleRepository.find({ relations: ['permissions', 'users'], order: { id: 'ASC' } });
    }
}
