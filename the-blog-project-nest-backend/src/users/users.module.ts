import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { AddUserCommand } from './commands/user.addUser';
import { LoginUserCommand } from './commands/user.loginUser';
import { FindAllUsersQuery } from './queries/user.findAll';
import { UserQueriesController } from './controllers/queries.controller';
import { FindAllRolesQuery } from './queries/role.findAll';
import { FindAllPermissionsQuery } from './queries/permission.findAll';
import { FindUserByIdQuery } from './queries/user.findById';
import { ChangeUserPasswordCommand } from './commands/user.changeUserPassword';
import { ChangeMyPasswordCommand } from './commands/user.changeMyPassword';
import { UpdateUserCommand } from './commands/user.updateUser';
import { UserCommandsController } from './controllers/commands.controller';
import { Module as Mod } from './entities/module.entity';
import { FindAllModulesQuery } from './queries/module.findAll';
import { FindModuleByIdQuery } from './queries/module.findById';
import { FindRoleByIdQuery } from './queries/role.findById';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Mod, User, Role, Permission])],
  providers: [UsersService,
    AddUserCommand, LoginUserCommand, ChangeUserPasswordCommand, ChangeMyPasswordCommand, UpdateUserCommand,
    FindAllUsersQuery, FindAllRolesQuery, FindAllPermissionsQuery, FindUserByIdQuery,
    FindAllModulesQuery, FindModuleByIdQuery, FindRoleByIdQuery,
  ],
  exports: [UsersService, AddUserCommand, LoginUserCommand],
  controllers: [UserQueriesController, UserCommandsController],
})
export class UsersModule { }
