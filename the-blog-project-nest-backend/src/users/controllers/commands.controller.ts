import { Controller, Get, Body, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { AddUserCommand } from '../commands/user.addUser';
import { ChangeMyPasswordCommand } from '../commands/user.changeMyPassword';
import { ChangeUserPasswordCommand } from '../commands/user.changeUserPassword';
import { UpdateUserCommand } from '../commands/user.updateUser';
import { AddUserDTO } from '../dtos/addUser.dto';
import { ChangeMyPasswordDTO } from '../dtos/changeMyPassword.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
import { ChangeUserPasswordDTO } from '../dtos/changeUserPassword.dto';
import { RoleAddPermissionDTO } from '../dtos/roleAddPermission.dto';
import { RoleRemovePermissionDTO } from '../dtos/roleRemovePermission.dto';
import { UserAddRoleDTO } from '../dtos/userAddRole.dto';
import { UserRemoveRoleDTO } from '../dtos/userRemoveRole.dto';
import { RoleAddPermissionCommand } from '../commands/role.addPermission';
import { RoleRemovePermissionCommand } from '../commands/role.removePermission';
import { UserAddRoleCommand } from '../commands/user.addRole';
import { UserRemoveRoleCommand } from '../commands/user.removeRole';
import { RemoveRoleDTO } from '../dtos/removeRole.dto';
import { AddRoleDTO } from '../dtos/addRole.dto';
import { UpdateRoleDTO } from '../dtos/updateRole.dto';
import { AddRoleCommand } from '../commands/role.addRole';
import { UpdateRoleCommand } from '../commands/role.updateRole';
import { RemoveRoleCommand } from '../commands/role.removeRole';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../guards/permission.guard';

@Controller('/api/commands')
@UseGuards(PermissionGuard)
@UseGuards(AuthGuard('jwt'))
export class UserCommandsController {
    constructor(
        private readonly addUserCommand: AddUserCommand,
        private readonly updateUserCommand: UpdateUserCommand,
        private readonly changeMyPasswordCommand: ChangeMyPasswordCommand,
        private readonly changeUserPasswordCommand: ChangeUserPasswordCommand,
        private readonly roleAddPermissionCommand: RoleAddPermissionCommand,
        private readonly roleRemovePermissionCommand: RoleRemovePermissionCommand,
        private readonly userAddRoleCommand: UserAddRoleCommand,
        private readonly userRemoveRoleCommand: UserRemoveRoleCommand,
        private readonly addRoleCommand: AddRoleCommand,
        private readonly updateRoleCommand: UpdateRoleCommand,
        private readonly removeRoleCommand: RemoveRoleCommand,
    ) { }

    @Post('user.addUser')
    async user_addUser(@Body() dto: AddUserDTO): Promise<any> {
        return this.addUserCommand.execute(dto);
    }

    @Post('user.changeMyPassword')
    async user_changeMyPassword(@Body() dto: ChangeMyPasswordDTO, @Req() request): Promise<any> {
        return this.changeMyPasswordCommand.execute(dto, request.user);
    }

    @Post('user.changeUserPassword')
    async user_changeUserPassword(@Body() dto: ChangeUserPasswordDTO): Promise<any> {
        return this.changeUserPasswordCommand.execute(dto);
    }

    @Post('user.updateUser')
    async user_updateUser(@Body() dto: UpdateUserDTO): Promise<Permission[]> {
        return this.updateUserCommand.execute(dto);
    }

    @Post('role.addPermission')
    async role_addPermission(@Body() dto: RoleAddPermissionDTO): Promise<any> {
        return this.roleAddPermissionCommand.execute(dto);
    }

    @Post('role.removePermission')
    async role_removePermission(@Body() dto: RoleRemovePermissionDTO): Promise<any> {
        return this.roleRemovePermissionCommand.execute(dto);
    }

    @Post('user.addRole')
    async user_addRole(@Body() dto: UserAddRoleDTO): Promise<any> {
        return this.userAddRoleCommand.execute(dto);
    }

    @Post('user.removeRole')
    async user_removeRole(@Body() dto: UserRemoveRoleDTO): Promise<any> {
        return this.userRemoveRoleCommand.execute(dto);
    }

    @Post('role.addRole')
    async role_addRole(@Body() dto: AddRoleDTO): Promise<any> {
        return this.addRoleCommand.execute(dto);
    }

    @Post('role.updateRole')
    async role_updateRole(@Body() dto: UpdateRoleDTO): Promise<any> {
        return this.updateRoleCommand.execute(dto);
    }

    @Post('role.removeRole')
    async role_removeRole(@Body() dto: RemoveRoleDTO): Promise<any> {
        return this.removeRoleCommand.execute(dto);
    }

}
