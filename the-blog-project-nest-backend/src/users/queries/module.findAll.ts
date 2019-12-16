import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllModulesQuery {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    async execute(): Promise<Module[]> {
        return this.moduleRepository.find({ relations: ['permissions'], order: { id: 'ASC' } });
    }
}
