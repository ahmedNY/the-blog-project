import { Module } from '@nestjs/common';
import { BlogCommandsController } from './controllers/commands.controller';
import { BlogQueriesController } from './controllers/queries.controller';
import { DeletePostCommand } from './commands/post.deletePost';
import { InsertPostCommand } from './commands/post.insertPost';
import { UpdatePostCommand } from './commands/post.updatePost';
import { FindByIdQuery } from './queries/post.findById';
import { FindAllQuery } from './queries/post.findAll';
import { SearchQuery } from './queries/post.search';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [BlogCommandsController, BlogQueriesController],
    providers: [InsertPostCommand, UpdatePostCommand, DeletePostCommand, FindByIdQuery, FindAllQuery, SearchQuery],
})
export class BlogModule { }
