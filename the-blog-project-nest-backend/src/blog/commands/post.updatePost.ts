import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UpdatePostDTO } from '../dtos/updatePost.dto';
import { User } from 'src/users/entities/user.entity';

export class UpdatePostCommand {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    ) { }

    async execute(dto: UpdatePostDTO, user: User): Promise<Post> {
        const post = await this.postRepository.findOneOrFail(dto.id);
        post.title = dto.title;
        post.body = dto.body;
        post.updatedBy = user;
        return this.postRepository.save(post);
    }
}
