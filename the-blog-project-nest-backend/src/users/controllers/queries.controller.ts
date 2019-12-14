import { Controller, Get, Body } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FindAllUsersQuery } from '../queries/user.findAll';
import { FindAllRolesQuery } from '../queries/role.findAll';
import { FindAllPermissionsQuery } from '../queries/permission.findAll';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { FindUserByIdQuery } from '../queries/user.findById';

@Controller('/api/queries')
export class UserQueriesController {
    constructor(
        private readonly findAllUsersQuery: FindAllUsersQuery,
        private readonly findAllRolesQuery: FindAllRolesQuery,
        private readonly findAllPermissionsQuery: FindAllPermissionsQuery,
        private readonly findUserByIdQuery: FindUserByIdQuery,
    ) { }

    @Get('user.findAll')
    async findAllUsers(): Promise<User[]> {
        return this.findAllUsersQuery.execute();
    }

    @Get('role.findAll')
    async findAllRoles(): Promise<Role[]> {
        return this.findAllRolesQuery.execute();
    }

    @Get('permission.findAll')
    async findAllPermissions(): Promise<Permission[]> {
        return this.findAllPermissionsQuery.execute();
    }
}
