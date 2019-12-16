import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindModuleByIdQuery {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    async execute(moduleId: number): Promise<Module> {
        const module = await this.moduleRepository.findOne(moduleId);
        return module;
    }
}
