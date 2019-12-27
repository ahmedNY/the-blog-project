import { Module } from './module.model';
import { Role } from './role.model';

export class Permission {
    id: number;
    action: string;
    resource: string;
    module?: Module;
    roles?: Role;
}
