import { DynamicModule, Module } from '@nestjs/common';
import CommandService from './services/query.services';
import QueryService from './services/query.services';
import { QueryInterface } from './interfaces/query.interface';

@Module({
    providers: [CommandService, QueryService],
    exports: [CommandService, QueryService],
})
export class CQModule {
}
