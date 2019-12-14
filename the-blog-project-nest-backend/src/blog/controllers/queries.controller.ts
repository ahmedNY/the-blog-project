import { Controller, Post, Body, Req, Query, Get } from '@nestjs/common';
import { Post as PostEntity } from '../entities/post.entity';
import { FindAllQuery } from '../queries/post.findAll';
import { FindByIdQuery } from '../queries/post.findById';
import { SearchQuery } from '../queries/post.search';

@Controller('/api/queries/')
export class BlogQueriesController {
    constructor(
        private readonly findAllQuery: FindAllQuery,
        private readonly findByIdQuery: FindByIdQuery,
        private readonly searchQuery: SearchQuery,
    ) { }

    @Get('post.findAll')
    findAll(): Promise<PostEntity[]> {
        return this.findAllQuery.execute();
    }

    @Get('post.findById')
    findById(@Query('postId') postId: number): Promise<PostEntity> {
        return this.findByIdQuery.execute(postId);
    }

    @Get('post.findById')
    search(): Promise<PostEntity[]> {
        return this.searchQuery.execute();
    }
}
