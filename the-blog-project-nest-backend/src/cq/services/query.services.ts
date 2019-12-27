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
    async registerRoutes(moduleRef: ModuleRef, folder) {
        const httpAdapter = this.httpAdapterHost.httpAdapter as ExpressAdapter;
        const expressServer = httpAdapter.getInstance();
        const files = glob.sync(folder + '*.js');
        return function () {
            // console.log('QueryService.registerRoutes');
            // console.log(folder + '*.js');
            // console.log(files);
            files.forEach(async (file) => {
                const dotname = file.match(/(.*\/)*(.*).js$/)[2];
                const importedFile = await import(file);
                if (!importedFile.default) {
                    return;
                }
                const className = importedFile.default.name;
                const queryInstance = await moduleRef.get(className);
                console.log(` >> /api/users/queries/${dotname}`);
                expressServer.get(`/api/users/queries/${dotname}`, async (req, res) => {
                    const results = await queryInstance.execute(req.query);
                    res.send(results);
                });
            });
        };

    }
}
