import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export class SearchQuery {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    ) { }

    async execute(): Promise<Post[]> {
        return this.postRepository.find();
    }
}
