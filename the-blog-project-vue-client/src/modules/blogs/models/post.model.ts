import { User } from '@/modules/um/models/user.model';

export class Post {
    id?: number;

    title?: string;
    body?: string;

    images?: string[];

    cteatedBy?: User;
    cteatedAt?: Date;

    updatedBy?: User;
    updatedAt?: Date;
}
