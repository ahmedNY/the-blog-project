import { Injectable } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export default class CommandsService {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
    ) {

    }
    async registerRoutes() {
        const httpAdapter = this.httpAdapterHost.httpAdapter as ExpressAdapter;
        const express = httpAdapter.getInstance();
        console.log('CommandsService.registerRoutes');
    }
}
