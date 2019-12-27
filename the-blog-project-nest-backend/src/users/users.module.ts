import { Module, Inject } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Module as Mod } from './entities/module.entity';

import { UserQueriesController } from './controllers/queries.controller';
import { UserCommandsController } from './controllers/commands.controller';

import { AddUserCommand } from './commands/user.addUser';
import { LoginUserCommand } from './commands/user.loginUser';
import { ChangeUserPasswordCommand } from './commands/user.changeUserPassword';
import { ChangeMyPasswordCommand } from './commands/user.changeMyPassword';
import { UpdateUserCommand } from './commands/user.updateUser';
import { RoleAddPermissionCommand } from './commands/role.addPermission';
import { RoleRemovePermissionCommand } from './commands/role.removePermission';
import { UserAddRoleCommand } from './commands/user.addRole';
import { UserRemoveRoleCommand } from './commands/user.removeRole';
import { AddRoleCommand } from './commands/role.addRole';
import { UpdateRoleCommand } from './commands/role.updateRole';
import { RemoveRoleCommand } from './commands/role.removeRole';

import FindAllUsersQuery from './queries/user.findAll';
import FindUserByIdQuery from './queries/user.findById';
import FindAllPermissionsQuery from './queries/permission.findAll';
import FindAllRolesQuery from './queries/role.findAll';
import FindRoleByIdQuery from './queries/role.findById';
import FindModuleByIdQuery from './queries/module.findById';
import FindAllModulesQuery from './queries/module.findAll';
import { CQModule } from 'src/cq/cq.module';
import { AuthorizationService } from './services/authorization.service';
import { PermissionGuard } from 'src/users/guards/permission.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Mod, User, Role, Permission]), CQModule],
  providers: [
    PermissionGuard,
    AuthorizationService,
    UsersService,

    AddUserCommand,
    LoginUserCommand,
    ChangeUserPasswordCommand,
    ChangeMyPasswordCommand,
    UpdateUserCommand,
    RoleAddPermissionCommand,
    RoleRemovePermissionCommand,
    UserAddRoleCommand,
    UserRemoveRoleCommand,
    AddRoleCommand,
    UpdateRoleCommand,
    RemoveRoleCommand,

    FindAllUsersQuery,
    FindAllRolesQuery,
    FindAllPermissionsQuery,
    FindUserByIdQuery,
    FindAllModulesQuery,
    FindModuleByIdQuery,
    FindRoleByIdQuery,
  ],
  exports: [UsersService, LoginUserCommand],
  controllers: [UserQueriesController, UserCommandsController],
})
export class UsersModule {
}
