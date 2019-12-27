import { Role } from './role.model';

export class User {
    id?: number;
    displayName?: string;
    mobileNumber?: string;
    password?: string;
    createdAt?: string;
    roles?: Role[];
}
