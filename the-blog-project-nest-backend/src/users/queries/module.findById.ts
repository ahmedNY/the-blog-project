import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class Module_FindById {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    async execute(query): Promise<Module> {
        const moduleId: number = query.moduleId;
        const module = await this.moduleRepository.findOne(moduleId);
        return module;
    }
}
