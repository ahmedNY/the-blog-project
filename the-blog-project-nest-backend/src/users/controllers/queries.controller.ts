import { Controller, Get, Body, Query, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { Module } from '../entities/module.entity';
import Role_FindAll from '../queries/role.findAll';
import Role_FindById from '../queries/role.findById';
import User_FindAll from '../queries/user.findAll';
import User_FindById from '../queries/user.findById';
import Module_FindAll from '../queries/module.findAll';
import Module_FindById from '../queries/module.findById';
import Permission_FindAll from '../queries/permission.findAll';
import { CheckPermission } from 'src/users/decorators/permission.decorator';
import { PermissionGuard } from 'src/users/guards/permission.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/queries')
@UseGuards(PermissionGuard)
@UseGuards(AuthGuard('jwt'))
export class UserQueriesController {

    constructor(
        private readonly module_FindAll: Module_FindAll,
        private readonly module_FindById: Module_FindById,
        private readonly permission_FindAll: Permission_FindAll,
        private readonly role_FindAll: Role_FindAll,
        private readonly role_FindById: Role_FindById,
        private readonly user_FindAll: User_FindAll,
        private readonly user_FindById: User_FindById,
    ) {
    }

    @Get('user.findAll')
    async findAllUsers(): Promise<User[]> {
        return this.user_FindAll.execute();
    }

    @Get('user.findById')
    async user_finfById(@Query('userId') userId: number): Promise<User> {
        return this.user_FindById.execute(userId);
    }

    @Get('role.findAll')
    async findAllRoles(): Promise<Role[]> {
        return this.role_FindAll.execute();
    }

    @Get('role.findById')
    async role_finfById(@Query('roleId') roleId: number): Promise<Role> {
        return this.role_FindById.execute(roleId);
    }

    @Get('permission.findAll')
    async findAllPermissions(): Promise<Permission[]> {
        return this.permission_FindAll.execute();
    }

    @Get('module.findAll')
    @CheckPermission('manage:um')
    async module_findAll(@Req() req): Promise<Module[]> {
        return this.module_FindAll.execute({});
    }

    @Get('module.findById')
    async module_finfById(@Query('moduleId') moduleId: number): Promise<Module> {
        return this.module_FindById.execute(moduleId);
    }

}
