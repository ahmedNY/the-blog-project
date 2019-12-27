import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from '../entities/module.entity';
import { Repository } from 'typeorm';
import { QueryInterface } from 'src/cq/interfaces/query.interface';

@Injectable()
export default class Module_FindAll implements QueryInterface {
    constructor(
        @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    ) { }

    async execute(query: any): Promise<Module[]> {
        return this.moduleRepository.find({ relations: ['permissions'], order: { id: 'ASC' } });
    }
}
