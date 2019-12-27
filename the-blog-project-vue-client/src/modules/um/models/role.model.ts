import { Permission } from './permission.model';

export class Role {
    id?: number;
    roleName?: string;
    permissions?: Permission[];
}
