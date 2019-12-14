import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export class FindByIdQuery {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    ) { }

    async execute(postId: number): Promise<Post> {
        return this.postRepository.findOne(postId);
    }
}
