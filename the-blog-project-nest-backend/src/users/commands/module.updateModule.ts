import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateModuleDTO } from '../dtos/updateModule.dto';

@Injectable()
export class UpdateModuleCommand {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    async execute(dto: UpdateModuleDTO): Promise<any> {
        const module = await this.moduleRepository.findOne(dto.id);
        module.moduleName = dto.moduleName;
        await this.moduleRepository.save(module);
        return { success: true, message: 'Module updated successfully' };
    }
}
