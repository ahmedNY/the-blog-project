import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export class DeletePostCommand {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    ) { }

    execute(postId: number, user: User) {
        return this.postRepository.delete(postId);
    }
}
