import { Controller, Get, Body, Query } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FindAllUsersQuery } from '../queries/user.findAll';
import { FindAllRolesQuery } from '../queries/role.findAll';
import { FindAllPermissionsQuery } from '../queries/permission.findAll';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { FindUserByIdQuery } from '../queries/user.findById';
import { FindAllModulesQuery } from '../queries/module.findAll';
import { FindModuleByIdQuery } from '../queries/module.findById';
import { Module } from '../entities/module.entity';
import { FindRoleByIdQuery } from '../queries/role.findById';

@Controller('/api/queries')
export class UserQueriesController {
    constructor(
        private readonly findAllUsersQuery: FindAllUsersQuery,
        private readonly findAllRolesQuery: FindAllRolesQuery,
        private readonly findAllPermissionsQuery: FindAllPermissionsQuery,
        private readonly findUserByIdQuery: FindUserByIdQuery,
        private readonly findRoleByIdQuery: FindRoleByIdQuery,
        private readonly findAllModulesQuery: FindAllModulesQuery,
        private readonly findModuleByIdQuery: FindModuleByIdQuery,
    ) { }

    @Get('user.findAll')
    async findAllUsers(): Promise<User[]> {
        return this.findAllUsersQuery.execute();
    }

    @Get('user.findById')
    async user_finfById(@Query('userId') userId: number): Promise<User> {
        return this.findUserByIdQuery.execute(userId);
    }

    @Get('role.findAll')
    async findAllRoles(): Promise<Role[]> {
        return this.findAllRolesQuery.execute();
    }

    @Get('role.findById')
    async role_finfById(@Query('roleId') roleId: number): Promise<Role> {
        return this.findRoleByIdQuery.execute(roleId);
    }

    @Get('permission.findAll')
    async findAllPermissions(): Promise<Permission[]> {
        return this.findAllPermissionsQuery.execute();
    }

    @Get('module.findAll')
    async module_findAll(): Promise<Module[]> {
        return this.findAllModulesQuery.execute();
    }

    @Get('module.findById')
    async module_finfById(@Query('moduleId') moduleId: number): Promise<Module> {
        return this.findModuleByIdQuery.execute(moduleId);
    }

}
