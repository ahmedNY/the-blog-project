import { Injectable } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpAdapterHost, ModulesContainer, ModuleRef } from '@nestjs/core';
import * as glob from 'glob';

@Injectable()
export default class QueryService {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
    ) {

    }
}
