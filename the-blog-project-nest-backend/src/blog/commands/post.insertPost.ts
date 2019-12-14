import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { InsertPostDTO } from '../dtos/insertPost.dto';
import { User } from 'src/users/entities/user.entity';

export class InsertPostCommand {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    ) { }

    async execute(dto: InsertPostDTO, user: User): Promise<Post> {
        const post = this.postRepository.create(dto);
        post.images = [];
        post.createdBy = user;
        post.updatedBy = user;
        return this.postRepository.save(post);
    }
}
