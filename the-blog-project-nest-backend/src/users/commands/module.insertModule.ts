import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InsertModuleDTO } from '../dtos/InsertModule.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InsertModuleCommand {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    execute(dto: InsertModuleDTO): any {
        // create and validate module
        const module = this.moduleRepository.create(dto);
        // save module
        this.moduleRepository.save(module);
        return { success: true, message: 'Module added successfully' };
    }
}
