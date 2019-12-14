import { Controller, Post, Body, Req } from '@nestjs/common';
import { InsertPostDTO } from '../dtos/insertPost.dto';
import { Post as PostEntity } from '../entities/post.entity';
import { InsertPostCommand } from '../commands/post.insertPost';
import { UpdatePostCommand } from '../commands/post.updatePost';
import { UpdatePostDTO } from '../dtos/updatePost.dto';
import { DeletePostDTO } from '../dtos/deletePost.dto';
import { DeletePostCommand } from '../commands/post.deletePost';

@Controller('/api/commands/')
export class BlogCommandsController {
    constructor(
        private readonly insertPostCommand: InsertPostCommand,
        private readonly updatePostCommand: UpdatePostCommand,
        private readonly deletePostCommand: DeletePostCommand,
    ) { }

    @Post('post.insertPost')
    insertPost(@Body() insertPostDTO: InsertPostDTO, @Req() request): Promise<PostEntity> {
        return this.insertPostCommand.execute(insertPostDTO, request.user);
    }

    @Post('post.updatePost')
    updatePost(@Body() updatePostDTO: UpdatePostDTO, @Req() request): Promise<PostEntity> {
        return this.updatePostCommand.execute(updatePostDTO, request.user);
    }

    @Post('post.deletePost')
    deletePost(@Body() deletePostDTO: DeletePostDTO, @Req() request): any {
        return this.deletePostCommand.execute(deletePostDTO.postId, request.user);
    }
}
