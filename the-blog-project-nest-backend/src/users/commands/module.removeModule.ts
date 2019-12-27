import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RemoveModuleDTO } from '../dtos/removeModule.dto';

@Injectable()
export class RemoveModuleCommand {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    async execute(dto: RemoveModuleDTO): Promise<any> {
        const module = await this.moduleRepository.findOne(dto.moduleId);
        // save module
        await this.moduleRepository.delete(module);
        return { success: true, message: 'Module removed successfully' };
    }
}
