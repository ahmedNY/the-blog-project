import { Module } from '@nestjs/common';
import CommandService from './services/query.services';
import QueryService from './services/query.services';

@Module({
    providers: [CommandService, QueryService],
    exports: [CommandService, QueryService],
})
export class CQModule {
}
