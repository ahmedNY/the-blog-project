import { NestFactory, APP_FILTER } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as glob from 'glob';
import * as express from 'express';
import { AuthorizationService } from './users/services/authorization.service';

function registerQueryRoutes(app: NestExpressApplication, expressInstance: express.Application, moduleName: string, folderPath: string) {
  const files = glob.sync(`${folderPath}/*.js`);
  files.forEach(async (file) => {
    const dotname = file.match(/(.*\/)*(.*).js$/)[2];
    const importedFile = await import(file);
    if (!importedFile.default) {
      return;
    }
    const className = importedFile.default.name;
    const queryInstance = await app.get(className);
    console.log(` >> /api/${moduleName}/queries/${dotname}`);
    expressInstance.get(`/api/${moduleName}/queries/${dotname}`, async (req, res) => {
      // check if permission exists
      // then check if user has permission
      const results = await queryInstance.execute(req.query);
      res.send(results);
    });
  });
}

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));

  // import queries
  registerQueryRoutes(app, server, 'users', __dirname + '/users/queries/');

  const authorizationService = app.get<AuthorizationService>('AuthorizationService');
  authorizationService.hasPermission(1, 'manage', 'um');

  await app.listen(3000);
}
bootstrap();
