import { Module } from './module.model';
import { Role } from './role.model';

export class Permission {
    id: number;
    permissionName: number;
    module: Module;
    roles: Role;
}
